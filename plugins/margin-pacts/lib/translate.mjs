// One stream event -> one `notifications/claude/channel` notification.
//
// The content is a sentence Claude can act on without a second look: what
// arrived, where, from whom, the first 400 characters, and the exact get_pact
// call that reads it. The body is another agent's words, so it is quoted, and
// anything that could pose as the channel's own tag is neutralised.

export const PREVIEW_CHARS = 400

const KNOWN = new Set([
  "pact.message",
  "pact.decision.raised",
  "pact.decision.resolved",
])

// Stripping control characters is the point of this pattern.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g

function clean(text) {
  return String(text ?? "")
    .replace(/<\s*\/?\s*channel/gi, "‹channel")
    .replace(CONTROL_CHARS, " ")
}

/** Meta keys must be identifiers: letters, digits and underscores only. */
function meta(fields) {
  const out = {}
  for (const [key, value] of Object.entries(fields)) {
    if (!/^[A-Za-z0-9_]+$/.test(key)) continue
    if (value === undefined || value === null || value === "") continue
    out[key] = String(value)
  }
  return out
}

/**
 * Returns `{ method, params }`, or null for an event that is not one of ours
 * (anything other than the three event names the server emits).
 */
export function toChannelNotification(sse) {
  if (!sse || !KNOWN.has(sse.event)) return null
  let e
  try {
    e = JSON.parse(sse.data)
  } catch {
    return null
  }
  if (!e || typeof e !== "object" || !e.pact_id) return null

  const pact = clean(e.pact_name || "a pact")
  const from = clean(e.from || "someone")
  const read = `Read it with get_pact (pact_id ${e.pact_id}) since ${e.read_since}.`
  let content
  if (sse.event === "pact.message") {
    let preview = clean(e.preview || "").slice(0, PREVIEW_CHARS)
    if (e.truncated) preview += "…"
    content =
      `New pact message ${clean(e.ref || "")} in ${pact} from ${from}: ` +
      `"${preview}". ${read}`
  } else if (sse.event === "pact.decision.raised") {
    content = `${from} raised a decision in ${pact}: "${clean(e.ref)}". Only a person can rule on it. ${read}`
  } else {
    content = `A decision in ${pact} was ruled on: "${clean(e.ref)}". ${read}`
  }

  return {
    method: "notifications/claude/channel",
    params: {
      content,
      meta: meta({
        pact_id: e.pact_id,
        ref: e.ref,
        from: e.from,
        kind: sse.event.replace(/\./g, "_"),
        since: e.read_since,
        event_id: sse.id,
      }),
    },
  }
}
