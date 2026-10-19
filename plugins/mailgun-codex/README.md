# Mailgun Codex Plugin

This package installs Mailgun workflows into Codex.

## Includes

- MCP server config: `.mcp.json`
- Skills: `skills/` (shared Mailgun skills plus Codex skills generated from `shared/commands/codex`)
- Manifest: `.codex-plugin/plugin.json`
- Icon: `assets/mailgun-icon.png`

Codex plugins do not support commands or rules, so the Mailgun commands and the operational safety rule ship as skills.

## Install

```bash
codex plugin marketplace add mailgun/mailgun-plugins
codex plugin add mailgun-codex@mailgun
```

From a local checkout, run `codex plugin marketplace add .` from the repository root instead.

## Configure

Set:

```bash
export MAILGUN_API_KEY="key-..."
```

Restart Codex after changing environment values.

The MCP config forwards `MAILGUN_API_KEY`, `MAILGUN_API_REGION`, and `MAILGUN_MCP_TAGS` from the environment Codex was started in through `env_vars`. When the optional variables are unset, the MCP server defaults to the US region and all Mailgun tool tags.
