---
name: mailgun-setup
description: Configure Mailgun MCP credentials and tool scoping
---

# Mailgun Setup

Guide the user through configuring Mailgun credentials for this platform.

Ask for:

- Whether they use Mailgun's US or EU region.
- Whether they want all MCP tools or a narrower tag set.

Explain:

- `MAILGUN_API_KEY` is required.
- The packaged MCP config omits `MAILGUN_API_REGION`, so the MCP server defaults to `us`.
- The packaged MCP config omits `MAILGUN_MCP_TAGS`, so the MCP server exposes all tags.
- For EU or narrowed tools, the user should add `MAILGUN_API_REGION` or `MAILGUN_MCP_TAGS` to the installed platform MCP config.

Show the user the configuration keys to add. Do not ask them to paste the secret into chat.
