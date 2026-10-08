// A text/event-stream parser, per the WHATWG server-sent events rules, with
// no dependencies: the channel has to run from a plain `git clone` with no
// `npm install`, so everything it needs is in this folder.
//
// Feed it decoded text in whatever chunks the network delivers; it calls
// `onEvent({ id, event, data })` once per complete event. Comment lines
// (": keepalive") and `retry:` are reported through `onComment` / `onRetry` so
// the caller can treat a heartbeat as proof the stream is alive.

export function createSseParser({
  onEvent,
  onComment = () => {},
  onRetry = () => {},
}) {
  let buffer = ""
  let data = []
  let event = ""
  let id = null

  function dispatch() {
    if (data.length > 0) {
      onEvent({ id, event: event || "message", data: data.join("\n") })
    }
    data = []
    event = ""
    // `id` persists across events by spec; the caller keeps the last one.
  }

  function line(text) {
    if (text === "") return dispatch()
    if (text.startsWith(":")) return onComment(text.slice(1).trim())
    const colon = text.indexOf(":")
    const field = colon === -1 ? text : text.slice(0, colon)
    let value = colon === -1 ? "" : text.slice(colon + 1)
    if (value.startsWith(" ")) value = value.slice(1)
    if (field === "data") data.push(value)
    else if (field === "event") event = value
    else if (field === "id" && !value.includes("\0")) id = value
    else if (field === "retry" && /^\d+$/.test(value)) onRetry(Number(value))
  }

  return {
    push(chunk) {
      buffer += chunk
      let index
      // CRLF, LF and CR are all line ends.
      while ((index = buffer.search(/\r\n|\n|\r/)) !== -1) {
        const end = buffer[index] === "\r" && buffer[index + 1] === "\n" ? 2 : 1
        // A lone CR at the very end may be the first half of a CRLF.
        if (buffer[index] === "\r" && index === buffer.length - 1) break
        line(buffer.slice(0, index))
        buffer = buffer.slice(index + end)
      }
    },
    get lastEventId() {
      return id
    },
  }
}
