# Platform Support

This repo supports Cursor, Claude Code / Claude compatible plugins, and Gemini CLI extensions, plus a docs-only Codex plugin described [below](#codex).

| Feature | Cursor | Claude Code / Claude compatible | Gemini CLI |
| --- | --- | --- | --- |
| Root marketplace | `.cursor-plugin/marketplace.json` | `.claude-plugin/marketplace.json` | Not used by Gemini CLI |
| Plugin manifest | `plugins/mailgun-cursor/.cursor-plugin/plugin.json` | `plugins/mailgun-claude/.claude-plugin/plugin.json` | `plugins/mailgun-gemini/gemini-extension.json` |
| MCP config | `mcp.json` | `.mcp.json` | `mcpServers` in `gemini-extension.json` |
| Skills | Native `skills/` directory | Native `skills/` directory | `skills/` directory included with extension |
| Rules | Native `rules/*.mdc` | Included as guidance files where supported | No direct equivalent |
| Commands | Markdown commands listed in plugin manifest | Markdown commands listed in plugin manifest | TOML commands under `commands/mailgun/` |
| Shared content | Generated from `shared/` | Generated from `shared/` | Generated from `shared/` |
| Full support | Yes | Yes, with platform differences | Yes, with platform differences |

## Cursor

Cursor has the richest package in this repo. It includes marketplace metadata, a plugin manifest, MCP wiring, skills, rules, and commands.

## Claude Code

The Claude package includes a root marketplace, plugin manifest, `.mcp.json`, skills, and commands.

## Gemini CLI

Gemini uses a single extension manifest with MCP server settings. The source package lives under `plugins/mailgun-gemini`, but Gemini requires `gemini-extension.json` at the extension root. `npm run build:gemini` creates `dist/gemini/mailgun-gemini`, and the `Publish Gemini Extension Branch` workflow publishes that root shape to the `gemini-extension` branch.

Public install:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins --ref gemini-extension
```

## Codex

The Codex package is docs only for now. Codex reads the repo marketplace at `.agents/plugins/marketplace.json` and the manifest at `plugins/mailgun-codex/.codex-plugin/plugin.json`. Its `.mcp.json` points at the hosted Mailgun Docs MCP (`https://documentation.mailgun.com/mcp`), which needs no API key and has no account access, so the package ships the Codex-only `mailgun-docs-lookup` and `mailgun-api-integration` skills from `shared/codex/skills` instead of the shared account skills. `.mcp.json` disables the server's `submit-feedback` tool, its only tool that writes, so the plugin stays read-only. It has no commands or rules.

Install from GitHub:

```bash
codex plugin marketplace add mailgun/mailgun-plugins
codex plugin add mailgun-codex@mailgun
```

## Known Gaps

- Marketplace publication steps are platform controlled and intentionally documented rather than automated here.
- The Gemini CLI marketplace and distribution flow can differ by organization; this repo publishes a dedicated extension branch for GitHub installs.
- The OpenAI plugin directory lists plugins backed by a remote HTTPS MCP server. The Codex package uses the hosted Docs MCP so it can be submitted now; it gains the account workflows when a hosted Mailgun MCP exists.
- No platform package includes Mailgun API business logic. Any tool addition must happen in `mailgun-mcp-server` first.
