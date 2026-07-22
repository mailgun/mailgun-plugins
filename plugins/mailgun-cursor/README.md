# Mailgun Cursor Plugin

This package installs Mailgun workflows into Cursor.

## Includes

- MCP server config: `mcp.json`
- Skills: `skills/`
- Rules: `rules/`
- Commands: `commands/`
- Manifest: `.cursor-plugin/plugin.json`

## Configure

Set the Mailgun API key in Cursor's environment settings:

```json
{
  "env": {
    "MAILGUN_API_KEY": "key-..."
  }
}
```

Restart Cursor after changing environment values.

The packaged config uses the MCP server defaults: US region and all Mailgun tool tags. For EU accounts or scoped tool sets, add `MAILGUN_API_REGION` or `MAILGUN_MCP_TAGS` to `mcp.json`.

## Commands

- `mailgun-setup`
- `audit-domain-health`
- `investigate-bounces-last-7-days`
- `verify-dns-for-domain`
- `review-suppressions-for-domain`
- `draft-test-email-template`
- `compare-delivery-across-domains`
