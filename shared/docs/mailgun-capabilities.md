# Mailgun MCP Capability Summary

The Mailgun plugin packages rely on `@mailgun/mcp-server` for all Mailgun API execution. The plugin layer supplies instructions, commands, rules, setup documentation, and platform manifests.

## MCP Server

- Package: `@mailgun/mcp-server`
- Compatible version pinned by this repo: `2.3.1`
- Transport: local stdio
- Executable: `mailgun-mcp-server`
- Default launch: `npx -y @mailgun/mcp-server@2.3.1`

## Environment

- `MAILGUN_API_KEY` is required.
- `MAILGUN_API_REGION` is optional and should be `us` or `eu`; the server defaults to `us`.
- `MAILGUN_API_HOSTNAME` can override the API host chosen from the region when explicitly needed.
- `MAILGUN_MCP_TAGS` can narrow the exposed tool set. It takes a comma separated list of the values in [Tags and Toolsets](#tags-and-toolsets). When unset, the server loads every tool.

## Tags and Toolsets

`MAILGUN_MCP_TAGS` loads every tool that matches any listed value, so `send.templates,validate` loads both. Unknown values fail at startup. Run `npx -y @mailgun/mcp-server@2.3.1 --list-tags` to print every valid value.

Products:

- `send`: Mailgun Send API operations, including domains, DNS verification, messages, routes, mailing lists, templates, analytics, suppressions, IPs, limits, webhooks, keys, and account operations. Matches every `send.<group>` toolset below.
- `validate`: email address validation.
- `optimize`: inbox placement and seed test results.
- `inspect`: email preview rendering, checks, preview clients, and Email Preview QA composite workflows.

Send toolsets:

- `send.messages`: send email; retrieve and resend stored messages.
- `send.domains`: domains, DNS verification, sending queues, and tracking settings.
- `send.webhooks`: domain webhooks.
- `send.account`: account IPs, dedicated IP pools, and custom sending limits.
- `send.message_tags`: message tags, stats by tag, and tag limits.
- `send.analytics`: stats and aggregates, analytics metrics and logs, and bounce classification.
- `send.suppressions`: bounces, unsubscribes, complaints, and the allowlist.
- `send.routes`: inbound routes.
- `send.lists`: mailing lists and members.
- `send.templates`: templates and template versions.

Modes:

- `all`: every tool. This is the default.
- `core`: 15 core tools covering sending, domain details and DNS verification, tracking settings, metrics and logs, bounce classification, lookups of bounces, unsubscribes, and complaints, template listing, and address validation. Combine it with toolsets, for example `core,send.templates`.
- `dynamic`: the core tools at startup, plus `mailgun_list_toolsets`, `mailgun_enable_toolset`, and `mailgun_call_tool` so the model can load other toolsets on demand. Use it on its own; combining it with other values fails at startup. It needs a client that refreshes its tool list when the server reports a change. In other clients, read-only tools still run through `mailgun_call_tool`, but tools that change data need `all` or explicit toolsets. On-demand loading reduces what the model sees; it is not an access control.

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

- Start with diagnostics before making any account change.
- Ask before sending email, creating preview tests, editing DNS settings, updating tracking, mutating suppressions, changing webhooks, editing templates, or touching account/admin settings.
- Use the narrowest practical tag set. For example, use `MAILGUN_MCP_TAGS=inspect` for preview QA, `validate` for address checks, `send,inspect` for sending plus preflight, or `core,send.templates` for template work.
- Treat event logs, message bodies, stored messages, recipients, and template content as sensitive customer data.
