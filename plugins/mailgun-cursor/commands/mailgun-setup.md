---
name: mailgun-setup
description: Configure Mailgun MCP credentials and tool scoping
---

# Mailgun Setup

Guide the user through configuring Mailgun credentials for this platform.

Ask for:

- Mailgun API region: `us` or `eu`.
- Whether they want all MCP tools or a narrower tag set.

Explain:

- `MAILGUN_API_KEY` is required.
- `MAILGUN_API_REGION` defaults to `us`.
- `MAILGUN_MCP_TAGS` can be set to `send`, `validate`, `optimize`, `inspect`, or a comma-separated subset.

Show the user the environment keys to add to their agent settings. Do not ask them to paste the secret into chat.
