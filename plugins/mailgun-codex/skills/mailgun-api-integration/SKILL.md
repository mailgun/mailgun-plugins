---
name: mailgun-api-integration
description: Write, review, or debug application code that calls the Mailgun API, including sending email, templates, domains and DNS, webhooks and signature verification, events, suppressions, and address validation. Use when the user wants to add Mailgun to a project or fix an existing Mailgun integration.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, integration, sdk, webhooks, code
---

# Mailgun API Integration

Use this skill when the user is building or fixing code that talks to Mailgun.

## Intake

Check the project's language, framework, and any existing Mailgun SDK or HTTP client before writing code. Ask for the sending domain and region (US or EU) if the code needs them and they are not already in configuration.

## Workflow

1. Look up every endpoint the code will call with the `mailgun-docs` MCP server, following the `mailgun-docs-lookup` skill. Use the documented parameter names, content types, and response fields; do not rely on memory.
2. Prefer the official Mailgun SDK for the project's language when one is already installed or the user agrees to add it. Otherwise use the project's existing HTTP client.
3. Read the API key and domain from configuration or environment variables. Make the base URL configurable so EU accounts can use `https://api.eu.mailgun.net`.
4. For webhooks, verify the signature with the webhook signing key as documented, reject stale timestamps, and return a 2xx response quickly.
5. Handle documented error responses and rate limits, and surface the Mailgun message ID from send responses so the user can trace delivery.
6. Add or update tests that mock the Mailgun API rather than sending real email.

## Safety

- Never hardcode, log, or commit API keys or webhook signing keys, and keep them out of client-side code.
- Do not send real email or call the live API to test unless the user asks; suggest a sandbox domain or test mode first.
- Treat recipients, message content, and webhook payloads as personal data in logs and fixtures.
