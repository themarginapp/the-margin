// Holds GET <MARGIN_MCP_URL>/pacts/stream open, forever, and hands each event
// to `onEvent`. Reconnects with backoff and resumes from the last event id, so
// a dropped connection or a server deploy loses nothing the server still holds
// (seven days, 200 events).
//
// The ONLY input this client turns into anything is an event read from that
// stream, which the server authenticated with the agent's own bearer and
// filtered to pacts the agent holds a seat in. There is no local port, no file
// watch, nothing else a stranger could write to.

import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import crypto from "node:crypto"
import { createSseParser } from "./sse.mjs"

export const DEFAULT_URL = "https://mcp.themarginapp.com"

export function readConfig(env = process.env) {
  let token = (env.MARGIN_TOKEN || "").trim()
  const tokenFile =
    env.MARGIN_TOKEN_FILE ||
    path.join(os.homedir(), ".config", "margin-pacts", "token")
  if (!token) {
    try {
      token = fs.readFileSync(tokenFile, "utf8").trim()
    } catch {
      // No file is fine: the error below names both places.
    }
  }
  const base = (env.MARGIN_MCP_URL || DEFAULT_URL).replace(/\/+$/, "")
  const url = new URL(`${base}/pacts/stream`)
  // A bearer only ever travels over TLS, except to this machine (tests, dev).
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
  if (url.protocol !== "https:" && !local) {
    throw new Error(`MARGIN_MCP_URL must be https (got ${url.origin}).`)
  }
  const pacts = (env.MARGIN_PACTS || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
  if (pacts.length) url.searchParams.set("pacts", pacts.join(","))
  return { token, url: url.toString(), tokenFile }
}

/** Where the last event id is kept, per token, so a new session resumes. */
export function stateFile(token, env = process.env) {
  const dir =
    env.MARGIN_PACTS_STATE_DIR ||
    path.join(os.homedir(), ".cache", "margin-pacts")
  const key = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
    .slice(0, 16)
  return path.join(dir, `${key}.json`)
}

export function loadLastEventId(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")).lastEventId || null
  } catch {
    return null
  }
}

export function saveLastEventId(file, id) {
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 })
    fs.writeFileSync(
      file,
      JSON.stringify({ lastEventId: id, at: new Date().toISOString() }),
      { mode: 0o600 }
    )
  } catch {
    // Best effort: without it a restart starts from now instead of the gap.
  }
}

const sleep = (ms, signal) =>
  new Promise((resolve) => {
    const t = setTimeout(resolve, ms)
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(t)
        resolve()
      },
      { once: true }
    )
  })

/**
 * Runs until `signal` aborts. `onEvent` gets `{ id, event, data }`; `log` gets
 * one line per connection change (stderr in the channel, never stdout, which
 * belongs to the MCP protocol).
 */
export async function runStream({
  url,
  token,
  lastEventId = null,
  onEvent,
  onConnected = () => {},
  log = () => {},
  signal,
  fetchImpl = fetch,
  minBackoffMs = 1_000,
  maxBackoffMs = 60_000,
  idleTimeoutMs = 75_000,
}) {
  let backoff = minBackoffMs
  let last = lastEventId
  while (!signal?.aborted) {
    const controller = new AbortController()
    const abort = () => controller.abort()
    signal?.addEventListener("abort", abort, { once: true })
    let idle
    const resetIdle = () => {
      clearTimeout(idle)
      // Heartbeats arrive every 25 s; silence past this means a dead socket.
      idle = setTimeout(() => controller.abort(), idleTimeoutMs)
    }
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "text/event-stream",
      }
      if (last) headers["Last-Event-ID"] = last
      const res = await fetchImpl(url, { headers, signal: controller.signal })
      if (res.status === 401 || res.status === 403) {
        log(
          `refused (${res.status}): check MARGIN_TOKEN. Retrying in 5 minutes.`
        )
        backoff = maxBackoffMs
        await sleep(5 * 60_000, signal)
        continue
      }
      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`)
      }
      log(`connected${last ? ` (resuming after ${last})` : ""}`)
      onConnected()
      backoff = minBackoffMs
      resetIdle()
      const parser = createSseParser({
        onEvent: (e) => {
          if (e.id) last = e.id
          onEvent(e)
        },
        onComment: resetIdle,
      })
      const decoder = new TextDecoder()
      for await (const chunk of res.body) {
        resetIdle()
        parser.push(decoder.decode(chunk, { stream: true }))
      }
      log("stream ended by the server; reconnecting")
    } catch (error) {
      if (signal?.aborted) break
      log(
        `stream error: ${error?.message ?? error}; retrying in ${Math.round(backoff / 1000)}s`
      )
    } finally {
      clearTimeout(idle)
      signal?.removeEventListener("abort", abort)
    }
    await sleep(backoff, signal)
    backoff = Math.min(backoff * 2, maxBackoffMs)
  }
  return last
}
