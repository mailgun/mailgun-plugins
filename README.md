# Mailgun Gemini Extension

This package installs Mailgun workflows into Gemini CLI.

## Includes

- Extension manifest: `gemini-extension.json`
- MCP server config inside the manifest
- Skills: `skills/`
- TOML commands: `commands/mailgun/`

## Configure

Install from the generated extension branch:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins --ref gemini-extension
```

Use Gemini extension settings for:

- `MAILGUN_API_KEY`

The packaged config uses the MCP server defaults: US region and all Mailgun tool tags. For EU accounts or scoped tool sets, add `MAILGUN_API_REGION` or `MAILGUN_MCP_TAGS` to `gemini-extension.json` before publishing or in your local linked extension.
