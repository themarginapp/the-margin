# The connector

The Margin's MCP server is hosted, so there is nothing to install or run.

- **URL:** `https://mcp.themarginapp.com/mcp`
- **Transport:** Streamable HTTP
- **Sign-in:** OAuth 2.1 with PKCE and dynamic client registration, or a personal access token made in Settings → Integrations
- **Server card:** `https://themarginapp.com/.well-known/mcp/server-card.json`
- **Sandbox, no account:** `https://mcp.themarginapp.com/sandbox/mcp`

When you sign in you choose which workspaces the client may use. Every call is checked against your membership of that workspace, and you can end a client's access in Settings → Integrations.

## In this folder

- [`TOOLS.md`](TOOLS.md): every tool, whether it reads, writes or can remove, and what it does.
- [`tools.json`](tools.json): the same list with full input schemas and annotations.
- [`examples/`](examples): configs for clients that read a JSON file, and prompts to try.

## Good to know

- Each thing an assistant adds carries a small mark saying which connection added it. You can rename connections in Settings → Connected apps.
- Some tools belong to a plan. A call outside your plan is refused with the reason; nothing is changed.
- Decisions that belong to a person, such as accepting a debt claim from someone else, stay with that person.
