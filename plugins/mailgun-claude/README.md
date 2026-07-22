# Mailgun Claude Plugin

This package installs Mailgun workflows into Claude Code or Claude-compatible plugin hosts that support the Sinch-style plugin structure.

## Includes

- MCP server config: `.mcp.json`
- Skills: `skills/`
- Commands: `commands/`
- Manifest: `.claude-plugin/plugin.json`

## Configure

Set:

```bash
export MAILGUN_API_KEY="key-..."
```

Restart the host after changing environment values.

The packaged config uses the MCP server defaults: US region and all Mailgun tool tags. For EU accounts or scoped tool sets, add `MAILGUN_API_REGION` or `MAILGUN_MCP_TAGS` to `.mcp.json`.
