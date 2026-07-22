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
export MAILGUN_API_REGION="us"
export MAILGUN_MCP_TAGS="send,validate,optimize,inspect"
```

Restart the host after changing environment values.
