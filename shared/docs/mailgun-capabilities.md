# Mailgun MCP Capability Summary

The Mailgun plugin packages rely on `@mailgun/mcp-server` for all Mailgun API execution. The plugin layer supplies instructions, commands, rules, setup documentation, and platform manifests.

## MCP Server

- Package: `@mailgun/mcp-server`
- Compatible version pinned by this repo: `2.1.0`
- Transport: local stdio
- Executable: `mailgun-mcp-server`
- Default launch: `npx -y @mailgun/mcp-server@2.1.0`

## Environment

- `MAILGUN_API_KEY` is required.
- `MAILGUN_API_REGION` is optional and should be `us` or `eu`; the server defaults to `us`.
- `MAILGUN_API_HOSTNAME` can override the region-derived API host when explicitly needed.
- `MAILGUN_MCP_TAGS` can narrow the exposed tool set. Valid tags are `send`, `validate`, `optimize`, and `inspect`.

## Product Tags

- `send`: Mailgun Send API operations, including domains, DNS verification, messages, routes, mailing lists, templates, analytics, suppressions, IPs, limits, webhooks, keys, and account operations.
- `validate`: email address validation.
- `optimize`: inbox placement and seed test results.
- `inspect`: email preview rendering, checks, preview clients, and Email Preview QA composite workflows.

## Core Workflows

- Send and retrieve email, including stored message retrieval and resend.
- Inspect domains and verify DNS records.
- Query analytics logs and metrics for delivery, failures, engagement, providers, devices, and countries.
- Review and manage bounces, unsubscribes, complaints, and allowlist entries.
- Create and maintain templates and template versions.
- Configure tracking and webhooks.
- Review routes, mailing lists, IPs, IP pools, warmup, limits, and account settings.
- Run Email Preview QA for HTML email without sending a message.

## Safety Defaults

- Start with read-only diagnostics before making any account change.
- Ask before sending email, creating preview tests, editing DNS-related settings, updating tracking, mutating suppressions, changing webhooks, editing templates, or touching account/admin settings.
- Use the narrowest practical tag set. For example, use `MAILGUN_MCP_TAGS=inspect` for preview QA, `validate` for address checks, or `send,inspect` for sending plus preflight.
- Treat event logs, message bodies, stored messages, recipients, and template content as sensitive customer data.
