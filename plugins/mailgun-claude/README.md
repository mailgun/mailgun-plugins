# Mailgun Claude Plugin

This package installs Mailgun workflows into Claude Code or Claude compatible plugin hosts.

## Includes

- MCP server config: `.mcp.json`
- Skills: `skills/`
- Commands: `commands/`
- Manifest: `.claude-plugin/plugin.json`

## Install

Claude Code:

```bash
claude plugin marketplace add mailgun/mailgun-plugins
claude plugin install mailgun-claude@mailgun
```

Claude desktop: download `mailgun-claude-<version>.zip` from the [latest release](https://github.com/mailgun/mailgun-plugins/releases/latest) and choose it on the **Upload a plugin** screen.

## Configure

Set:

```bash
export MAILGUN_API_KEY="key-..."
```

Restart the host after changing environment values.

The Claude desktop app doesn't read shell profile exports when launched from the Dock or Finder. On macOS, run `launchctl setenv MAILGUN_API_KEY "key-..."`, then fully quit and reopen the app.

The packaged config uses the MCP server defaults: US region and all Mailgun tool tags. For EU accounts or scoped tool sets, add `MAILGUN_API_REGION` or `MAILGUN_MCP_TAGS` to `.mcp.json`.
