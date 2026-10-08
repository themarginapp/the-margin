#!/usr/bin/env node
// The FALLBACK for sessions that cannot load a channel (an org with channels
// off, a client without them): an `asyncRewake` hook.
//
// Claude Code runs this in the background after each turn (Stop) and at
// session start. It holds the same /pacts/stream as the channel until the first
// event arrives, waits two seconds to gather any that came with it, prints them
// to stderr and exits 2, which wakes Claude with that text as a system
// reminder. The next Stop starts the next waiter, so the session keeps
// listening between turns. It does nothing unless MARGIN_PACTS_REWAKE=1, so a
// session that also has the channel is not woken twice for one message.

import fs from "node:fs"
import path from "node:path"
import {
  readConfig,
  runStream,
  stateFile,
  loadLastEventId,
  saveLastEventId,
} from "../lib/stream.mjs"
import { toChannelNotification } from "../lib/translate.mjs"

if (process.env.MARGIN_PACTS_REWAKE !== "1") process.exit(0)

let config
try {
  config = readConfig()
} catch {
  process.exit(0)
}
if (!config.token) process.exit(0)

// One waiter per session: a second Stop while the first still waits exits.
let sessionId = "default"
try {
  const input = JSON.parse(fs.readFileSync(0, "utf8") || "{}")
  if (
    typeof input.session_id === "string" &&
    /^[A-Za-z0-9_-]+$/.test(input.session_id)
  ) {
    sessionId = input.session_id
  }
} catch {
  // No hook input (run by hand): one shared waiter.
}
const file = stateFile(config.token)
const lock = path.join(path.dirname(file), `rewake-${sessionId}.lock`)
try {
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 })
  const fd = fs.openSync(lock, "wx")
  fs.writeSync(fd, String(process.pid))
  fs.closeSync(fd)
} catch {
  // Held by a live waiter? Leave it. Stale (that pid is gone)? Take it over.
  try {
    process.kill(Number(fs.readFileSync(lock, "utf8")), 0)
    process.exit(0)
  } catch {
    fs.writeFileSync(lock, String(process.pid))
  }
}
const release = () => {
  try {
    fs.unlinkSync(lock)
  } catch {
    // Already gone: another waiter took over a stale lock.
  }
}

const lines = []
const abort = new AbortController()
let flush = null

runStream({
  url: config.url,
  token: config.token,
  lastEventId: loadLastEventId(file),
  signal: abort.signal,
  onEvent: (sse) => {
    const n = toChannelNotification(sse)
    if (sse.id) saveLastEventId(file, sse.id)
    if (!n) return
    lines.push(n.params.content)
    flush ??= setTimeout(() => abort.abort(), 2_000)
  },
}).then(() => {
  release()
  if (lines.length === 0) process.exit(0)
  process.stderr.write(`Agent Pacts (The Margin):\n${lines.join("\n")}\n`)
  process.exit(2)
})

for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => {
    release()
    process.exit(0)
  })
}
