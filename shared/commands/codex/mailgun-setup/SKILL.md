---
name: mailgun-setup
description: Configure Mailgun MCP credentials, region, and tool scoping for Codex. Use when the user is setting up the Mailgun plugin, the Mailgun MCP server fails to start, tools return 401 or region errors, or the user wants fewer Mailgun tools exposed.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, setup, credentials, mcp
---

# Mailgun Setup

Guide the user through configuring Mailgun credentials for Codex.

Ask for:

- Whether they use Mailgun's US or EU region.
- Whether they want all MCP tools or a narrower tag set.

Explain:

- `MAILGUN_API_KEY` is required. The plugin forwards it from the environment Codex was started in, so the user should export it in their shell profile and restart Codex.
- The plugin also forwards `MAILGUN_API_REGION` and `MAILGUN_MCP_TAGS` when they are set. When unset, the MCP server defaults to the `us` region and exposes all tags.
- Valid tags are `send`, `validate`, `optimize`, and `inspect`.
- Per-project overrides belong under `[plugins."mailgun-codex@mailgun".mcp_servers.mailgun]` in `.codex/config.toml`, for example `enabled_tools` or `default_tools_approval_mode`.

Show the user the variables to export. Do not ask them to paste the secret into chat.
