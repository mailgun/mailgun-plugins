# Mailgun Gemini Extension

This package installs Mailgun workflows into Gemini CLI.

## Includes

- Extension manifest: `gemini-extension.json`
- MCP server config inside the manifest
- Skills: `skills/`
- TOML commands: `commands/mailgun/`

## Install

Install the latest release, or add `--ref v<version>` to pin one:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins
```

Or install from the generated extension branch, which tracks `main`, and answer yes when Gemini offers to fall back to `git clone`:

```bash
gemini extensions install https://github.com/mailgun/mailgun-plugins --ref gemini-extension
```

## Configure

Use Gemini extension settings for:

- `MAILGUN_API_KEY`

The packaged config uses the MCP server defaults: US region and all Mailgun tool tags. For EU accounts or scoped tool sets, add `MAILGUN_API_REGION` or `MAILGUN_MCP_TAGS` to `gemini-extension.json` before publishing or in your local linked extension.
