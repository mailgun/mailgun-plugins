# Platform Support

This repo supports Cursor, Claude Code / Claude compatible plugins, Gemini CLI extensions, and Codex plugins.

| Feature | Cursor | Claude Code / Claude compatible | Gemini CLI | Codex |
| --- | --- | --- | --- | --- |
| Root marketplace | `.cursor-plugin/marketplace.json` | `.claude-plugin/marketplace.json` | Not used by Gemini CLI | `.agents/plugins/marketplace.json` |
| Plugin manifest | `plugins/mailgun-cursor/.cursor-plugin/plugin.json` | `plugins/mailgun-claude/.claude-plugin/plugin.json` | `plugins/mailgun-gemini/gemini-extension.json` | `plugins/mailgun-codex/.codex-plugin/plugin.json` |
| MCP config | `mcp.json` | `.mcp.json` | `mcpServers` in `gemini-extension.json` | `.mcp.json` with `env_vars` |
| Skills | Native `skills/` directory | Native `skills/` directory | `skills/` directory included with extension | Native `skills/` directory |
| Rules | Native `rules/*.mdc` | Included as guidance files where supported | No direct equivalent | Shipped as the `mailgun-operational-safety` skill |
| Commands | Markdown commands listed in plugin manifest | Markdown commands listed in plugin manifest | TOML commands under `commands/mailgun/` | Shipped as skills from `shared/commands/codex` |
| Shared content | Generated from `shared/` | Generated from `shared/` | Generated from `shared/` | Generated from `shared/` |
| Full support | Yes | Yes, with platform differences | Yes, with platform differences | Yes, with platform differences |

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

Codex reads the repo marketplace at `.agents/plugins/marketplace.json` and the manifest at `.codex-plugin/plugin.json`. Codex plugins have no commands or rules, so `shared/commands/codex` holds those workflows as skills, and `npm run sync` merges them with the shared skills.

Codex passes only listed variables to stdio MCP servers. The `.mcp.json` uses `env_vars` to forward `PATH`, `HOME`, `MAILGUN_API_KEY`, `MAILGUN_API_REGION`, and `MAILGUN_MCP_TAGS` from the environment Codex was started in. The desktop apps launched from the Dock or Finder do not see shell profile exports, so macOS desktop users set the key with `launchctl setenv MAILGUN_API_KEY "key-..."` and restart the app.

Install from GitHub:

```bash
codex plugin marketplace add mailgun/mailgun-plugins
codex plugin add mailgun-codex@mailgun
```

## Known Gaps

- Marketplace publication steps are platform controlled and intentionally documented rather than automated here.
- The Gemini CLI marketplace and distribution flow can differ by organization; this repo publishes a dedicated extension branch for GitHub installs.
- The OpenAI plugin directory requires a remote HTTPS MCP server (OAuth 2.1 for user data) for public listing. Local stdio servers are limited to allowlisted partners. Until a hosted Mailgun MCP exists, the Codex package installs from GitHub only.
- No platform package includes Mailgun API business logic. Any tool addition must happen in `mailgun-mcp-server` first.
