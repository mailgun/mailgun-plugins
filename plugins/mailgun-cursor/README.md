# Mailgun Cursor Plugin

This package installs Mailgun workflows into Cursor.

## Includes

- MCP server config: `mcp.json`
- Skills: `skills/`
- Rules: `rules/`
- Commands: `commands/`
- Manifest: `.cursor-plugin/plugin.json`

## Configure

Set these environment variables in Cursor's environment settings:

```json
{
  "env": {
    "MAILGUN_API_KEY": "key-...",
    "MAILGUN_API_REGION": "us",
    "MAILGUN_MCP_TAGS": "send,validate,optimize,inspect"
  }
}
```

Restart Cursor after changing environment values.

## Commands

- `mailgun-setup`
- `audit-domain-health`
- `investigate-bounces-last-7-days`
- `verify-dns-for-domain`
- `review-suppressions-for-domain`
- `draft-test-email-template`
- `compare-delivery-across-domains`
