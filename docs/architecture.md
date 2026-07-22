# Architecture

Mailgun Plugins is intentionally a packaging repository. It keeps Mailgun API behavior in `mailgun-mcp-server` and focuses this repo on platform distribution.

## Layers

| Layer | Location | Responsibility |
| --- | --- | --- |
| Execution | `@mailgun/mcp-server` | Registers Mailgun MCP tools and calls Mailgun APIs. |
| Shared content | `shared/` | Canonical skills, rules, prompts, setup docs, and examples. |
| Platform packages | `plugins/mailgun-*` | Manifests, MCP config, commands, generated skills/rules. |
| Validation | `scripts/` and `.github/workflows/` | Manifest checks, sync checks, required file checks, MCP version pin checks. |

## Dependency Direction

The platform packages depend on the published MCP package. They do not copy API clients, OpenAPI specs, endpoint lists, or business logic from the MCP server.

```mermaid
flowchart LR
  Shared["shared content"] --> Cursor["plugins/mailgun-cursor"]
  Shared --> Claude["plugins/mailgun-claude"]
  Shared --> Gemini["plugins/mailgun-gemini"]
  Cursor --> MCP["@mailgun/mcp-server"]
  Claude --> MCP
  Gemini --> MCP
  MCP --> API["Mailgun APIs"]
```

## Shared Content Sync

`shared/skills` is copied into every platform package. `shared/rules` is copied into Cursor and Claude packages. Commands are authored by platform because command formats differ:

- Cursor and Claude use Markdown command files.
- Gemini uses TOML command files.

Run `npm run sync` after editing shared content. CI runs `npm run check:sync` so generated platform copies cannot drift silently.

## MCP Startup

Default startup uses:

```bash
npx -y @mailgun/mcp-server@2.1.0
```

This gives each platform a predictable, versioned MCP dependency. Local development can override the command to a built checkout of `mailgun-mcp-server` without changing plugin content.

## Safety Model

The MCP server exposes a curated tool surface. The plugin adds agent guidance:

- read-only diagnostics first,
- explicit confirmation before sending or mutating,
- narrow tool scoping through `MAILGUN_MCP_TAGS`,
- sensitivity handling for recipients, logs, stored messages, templates, webhook payloads, and API keys.
