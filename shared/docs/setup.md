# Mailgun Plugin Setup

## Required Credential

Set `MAILGUN_API_KEY` to a Mailgun private API key before starting the MCP server. For EU accounts, set `MAILGUN_API_REGION=eu`.

```bash
export MAILGUN_API_KEY="key-..."
export MAILGUN_API_REGION="us"
```

Use a scoped key when a workflow only needs sending. Use account-level credentials only when diagnostics or account administration require them.

## Optional Region and Tool Scoping

Packaged plugin configs only require `MAILGUN_API_KEY`. The MCP server defaults to US region and all tool tags. To use the EU region or expose only a subset of tools, add the optional variables to the installed platform MCP config:

```bash
export MAILGUN_API_REGION="eu"
export MAILGUN_MCP_TAGS="send,inspect"
```

Valid tags are `send`, `validate`, `optimize`, and `inspect`.

## Local MCP Development Override

The packaged plugins use the published npm package by default. To test a local checkout of `mailgun-mcp-server`, replace the MCP command in the platform config with:

```json
{
  "command": "node",
  "args": ["../mailgun-mcp-server/dist/mailgun-mcp.js"]
}
```

Build the server checkout first, then restart the agent platform so it reloads the MCP configuration.
