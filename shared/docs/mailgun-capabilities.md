# Mailgun MCP Capability Summary

The Mailgun plugin packages rely on `@mailgun/mcp-server` for all Mailgun API execution. The plugin layer supplies instructions, commands, rules, setup documentation, and platform manifests.

## MCP Server

- Package: `@mailgun/mcp-server`
- Compatible version pinned by this repo: `2.4.0`
- Transport: local stdio
- Executable: `mailgun-mcp-server`
- Default launch: `npx -y @mailgun/mcp-server@2.4.0`

## Environment

- `MAILGUN_API_KEY` is required.
- `MAILGUN_API_REGION` is optional and should be `us` or `eu`; the server defaults to `us`.
- `MAILGUN_API_HOSTNAME` can override the API host chosen from the region when explicitly needed.
- `MAILGUN_MCP_TAGS` can narrow the exposed tool set. Valid tags are `send`, `validate`, `optimize`, and `inspect`.

## Product Tags

- `send`: Mailgun Send API operations, including domains, DNS verification, messages, routes, mailing lists, templates, analytics, suppressions, IPs, limits, webhooks, keys, and account operations.
- `validate`: email address validation.
- `optimize`: inbox placement and seed test results.
- `inspect`: email preview rendering, checks, preview clients, and Email Preview QA composite workflows.

## Email Preview QA

The `inspect` tag exposes two composite tools and the read primitives behind them:

- `run_email_preview_qa` creates one remote preview test from rendered HTML and a subject, polls for up to 45 seconds, and returns counts, per check status, and result references. It consumes preview quota, does not send email, and never retries the create.
- `get_email_preview_qa` resumes and summarizes an existing test by `test_id`. It never creates a test.
- Read primitives: `list_preview_tests`, `get_preview_test_status`, `get_preview_client_result`, `list_preview_clients`, `get_link_validation_result`, `get_image_validation_result`, `get_accessibility_result`, `get_code_analysis_result`, and the older `get_preview_result`.

The composites do not return a pass/fail verdict. The `inspect-email-preflight` skill covers the create and resume rules, check and client selection, and reporting.

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
- Ask before sending email, creating preview tests (a direct request to run or preflight specific HTML confirms one test), editing DNS settings, updating tracking, mutating suppressions, changing webhooks, editing templates, or touching account/admin settings.
- Use the narrowest practical tag set. For example, use `MAILGUN_MCP_TAGS=inspect` for preview QA, `validate` for address checks, or `send,inspect` for sending plus preflight.
- Treat event logs, message bodies, stored messages, recipients, and template content as sensitive customer data.
