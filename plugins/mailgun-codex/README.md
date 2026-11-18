# Mailgun Codex Plugin

This package connects Codex to the [Mailgun Docs MCP](https://documentation.mailgun.com/mcp) for building with the Mailgun API.

## Includes

- MCP server config: `.mcp.json`, a remote HTTP server at `https://documentation.mailgun.com/mcp` with only its read-only tools enabled
- Skills: `skills/` (`mailgun-docs-lookup` and `mailgun-api-integration`)
- Manifest: `.codex-plugin/plugin.json`
- Icon: `assets/mailgun-icon.png`

The Docs MCP is public and needs no API key. It searches the Mailgun documentation and API reference; it does not access a Mailgun account. The account workflows in the other Mailgun plugins (deliverability, suppressions, DNS checks, and so on) need the local `@mailgun/mcp-server`, so they are not part of this package until a hosted Mailgun MCP is available.

The skills are synced from `shared/codex/skills` rather than `shared/skills`, because the shared skills call account tools. Edit them there and run `npm run sync`.

The Docs MCP also has a `submit-feedback` tool that sends documentation feedback to Mailgun. `.mcp.json` disables it so the plugin stays read-only.

## Install

```bash
codex plugin marketplace add mailgun/mailgun-plugins
codex plugin add mailgun-codex@mailgun
```

From a local checkout, run `codex plugin marketplace add .` from the repository root instead.
