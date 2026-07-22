# Mailgun Plugins

Mailgun Plugins is a companion repository for packaging Mailgun into installable AI-agent plugins. It does not reimplement Mailgun API behavior. The execution layer is [`@mailgun/mcp-server`](https://github.com/mailgun/mailgun-mcp-server), and this repository provides the distribution layer: manifests, skills, rules, commands, setup guidance, validation, and release workflow.

This structure follows the same separation of concerns used by Sinch's multi-platform plugin repo: a standalone MCP server repo plus a companion plugin-packaging repo.

## Supported Platforms

| Platform | Package | Status | Notes |
| --- | --- | --- | --- |
| Cursor | `plugins/mailgun-cursor` | First-class | Marketplace manifest, plugin manifest, MCP config, skills, rules, and commands. |
| Claude Code / Claude-compatible | `plugins/mailgun-claude` | Supported | Claude marketplace/plugin manifest, MCP config, skills, and commands. Rules are included as guidance files where supported by the client. |
| Gemini CLI | `plugins/mailgun-gemini` | Supported | Gemini extension manifest, MCP server config, settings metadata, skills, and TOML commands. |

See [docs/platform-support.md](docs/platform-support.md) for the detailed matrix.

## How It Works

- `shared/` is the canonical source for Mailgun skills, reusable rules, setup docs, example prompts, and examples.
- `plugins/mailgun-cursor`, `plugins/mailgun-claude`, and `plugins/mailgun-gemini` contain platform-specific manifests and generated copies of shared content.
- `scripts/sync-shared.mjs` copies shared content into each platform package.
- `scripts/validate.mjs` checks manifests, referenced files, skill frontmatter, MCP version pinning, and required docs.
- CI runs sync drift checks and validation on every push and pull request.

## MCP Server Compatibility

This repo currently pins plugin MCP startup commands to:

```bash
npx -y @mailgun/mcp-server@2.1.0
```

Required environment:

- `MAILGUN_API_KEY`: Mailgun private API key.
- `MAILGUN_API_REGION`: optional, `us` or `eu`; defaults to `us` in the MCP server.
- `MAILGUN_MCP_TAGS`: optional comma-separated subset of `send`, `validate`, `optimize`, `inspect`.

## Install

### Cursor

Install from the Cursor plugin marketplace when published, or add this repository as a marketplace source in Cursor and install `mailgun-cursor`.

The Cursor package includes:

- Mailgun MCP config at `plugins/mailgun-cursor/mcp.json`.
- Six task-oriented skills.
- Safety rules in `plugins/mailgun-cursor/rules`.
- Commands for domain health, bounces, DNS, suppressions, templates, and cross-domain reporting.

### Claude Code

Add this repository as a Claude plugin marketplace source, then install `mailgun-claude`.

The Claude package includes a `.mcp.json` file, the shared Mailgun skills, and Claude-compatible commands.

### Gemini CLI

Install this repository as a Gemini extension source when distributing directly from GitHub:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins
```

The Gemini package is under `plugins/mailgun-gemini` and includes `gemini-extension.json`, skills, and TOML commands.

## Local Development

```bash
npm run sync
npm run validate
npm run check:sync
```

To verify the MCP server tag list from npm:

```bash
npm run mcp:tags
```

To test against a local server checkout, build `../mailgun-mcp-server`, then use the local override pattern in [shared/docs/setup.md](shared/docs/setup.md).

## Release

1. Update the compatible MCP version in platform MCP configs, docs, and `scripts/validate.mjs`.
2. Run `npm run sync`.
3. Run `npm run validate` and `npm run check:sync`.
4. Update changelogs and tag the repo release.
5. Publish or refresh platform marketplace listings.

See [docs/release-process.md](docs/release-process.md) for details.

## Troubleshooting

- Missing API key: set `MAILGUN_API_KEY` in the platform environment and restart the agent app.
- Wrong region: set `MAILGUN_API_REGION=eu` for EU accounts.
- Too many tools: set `MAILGUN_MCP_TAGS` to a narrower subset.
- Local server testing: build the MCP server first, then point the platform MCP config at `dist/mailgun-mcp.js`.
