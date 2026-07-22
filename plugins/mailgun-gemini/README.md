# Mailgun Gemini Extension

This package installs Mailgun workflows into Gemini CLI using the extension structure mirrored from the Sinch reference repository.

## Includes

- Extension manifest: `gemini-extension.json`
- MCP server config inside the manifest
- Skills: `skills/`
- TOML commands: `commands/mailgun/`

## Configure

Use Gemini extension settings or environment variables for:

- `MAILGUN_API_KEY`
- `MAILGUN_API_REGION`
- `MAILGUN_MCP_TAGS`
