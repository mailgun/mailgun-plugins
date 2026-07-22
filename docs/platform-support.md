# Platform Support

This repo supports Cursor, Claude Code / Claude-compatible plugins, and Gemini CLI extensions.

| Feature | Cursor | Claude Code / Claude-compatible | Gemini CLI |
| --- | --- | --- | --- |
| Root marketplace | `.cursor-plugin/marketplace.json` | `.claude-plugin/marketplace.json` | Not used by Gemini CLI |
| Per-plugin manifest | `plugins/mailgun-cursor/.cursor-plugin/plugin.json` | `plugins/mailgun-claude/.claude-plugin/plugin.json` | `plugins/mailgun-gemini/gemini-extension.json` |
| MCP config | `mcp.json` | `.mcp.json` | `mcpServers` in `gemini-extension.json` |
| Skills | Native `skills/` directory | Native `skills/` directory | `skills/` directory included with extension |
| Rules | Native `rules/*.mdc` | Included as guidance files where supported | No direct equivalent |
| Commands | Markdown commands listed in plugin manifest | Markdown commands listed in plugin manifest | TOML commands under `commands/mailgun/` |
| Shared content | Generated from `shared/` | Generated from `shared/` | Generated from `shared/` |
| First-class support | Yes | Yes, with platform differences | Yes, with platform differences |

## Cursor

Cursor has the richest package in this repo. It includes marketplace metadata, a per-plugin manifest, MCP wiring, skills, rules, and commands.

## Claude Code

The Claude package includes a root marketplace, per-plugin manifest, `.mcp.json`, skills, and commands.

## Gemini CLI

Gemini uses a single extension manifest with MCP server settings. The source package lives under `plugins/mailgun-gemini`, but Gemini requires `gemini-extension.json` at the extension root. `npm run build:gemini` creates `dist/gemini/mailgun-gemini`, and the `Publish Gemini Extension Branch` workflow publishes that root shape to the `gemini-extension` branch.

Public install:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins --ref gemini-extension
```

## Known Gaps

- Marketplace publication steps are platform-owned and intentionally documented rather than automated here.
- The Gemini CLI marketplace/distribution flow can differ by organization; this repo publishes a dedicated extension-rooted branch for GitHub installs.
- No platform package includes Mailgun API business logic. Any tool addition must happen in `mailgun-mcp-server` first.
