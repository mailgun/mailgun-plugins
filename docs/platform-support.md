# Platform Support

This repo mirrors the practical platform set in the Sinch companion plugin repository: Cursor, Claude Code / Claude-compatible plugins, and Gemini CLI extensions.

| Feature | Cursor | Claude Code / Claude-compatible | Gemini CLI |
| --- | --- | --- | --- |
| Root marketplace | `.cursor-plugin/marketplace.json` | `.claude-plugin/marketplace.json` | Not used by the Sinch reference pattern |
| Per-plugin manifest | `plugins/mailgun-cursor/.cursor-plugin/plugin.json` | `plugins/mailgun-claude/.claude-plugin/plugin.json` | `plugins/mailgun-gemini/gemini-extension.json` |
| MCP config | `mcp.json` | `.mcp.json` | `mcpServers` in `gemini-extension.json` |
| Skills | Native `skills/` directory | Native `skills/` directory | `skills/` directory included with extension |
| Rules | Native `rules/*.mdc` | Included as guidance files where supported | No direct equivalent in the Sinch reference package |
| Commands | Markdown commands listed in plugin manifest | Markdown commands listed in plugin manifest | TOML commands under `commands/mailgun/` |
| Shared content | Generated from `shared/` | Generated from `shared/` | Generated from `shared/` |
| First-class support | Yes | Yes, with platform differences | Yes, with platform differences |

## Cursor

Cursor has the richest package in this repo. It includes marketplace metadata, a per-plugin manifest, MCP wiring, skills, rules, and commands.

## Claude Code

The Claude package follows the Sinch reference structure: root marketplace, per-plugin manifest, `.mcp.json`, skills, and commands.

## Gemini CLI

Gemini uses a single extension manifest with MCP server settings. The package includes skills and TOML commands, but it does not use Cursor-style `.mdc` rules.

## Known Gaps

- Marketplace publication steps are platform-owned and intentionally documented rather than automated here.
- The Gemini CLI marketplace/distribution flow can differ by organization; this repo follows the local/GitHub extension style used by the Sinch reference.
- No platform package includes Mailgun API business logic. Any tool addition must happen in `mailgun-mcp-server` first.
