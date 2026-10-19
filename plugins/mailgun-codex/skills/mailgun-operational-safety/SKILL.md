---
name: mailgun-operational-safety
description: Safety rules for any Mailgun MCP tool call. Use before calling Mailgun tools that send email, change domain, DNS, tracking, webhook, template, route, suppression, IP pool, DKIM, key, or subaccount settings, and whenever handling recipients, logs, stored messages, or API keys.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, safety, confirmation, operations
---

# Mailgun Operational Safety

Use Mailgun tools cautiously and narrate intent before any action that can change account state, consume quota, or send content externally.

- Prefer diagnostics before mutating actions.
- Require explicit user confirmation before sending email, creating preview tests, updating templates, changing DNS/domain/tracking/webhook settings, importing or deleting suppressions, editing routes, changing IP pools, rotating DKIM keys, modifying keys, or changing account/subaccount configuration.
- Ask for missing operational context before calling tools: domain, region, date range, recipient, sender, template name, tag, provider, event type, or desired product scope.
- Avoid destructive and admin actions unless the user clearly requested the action and confirmed the target.
- Use the narrowest relevant tool tag. Prefer `validate` for address checks, `inspect` for email preview QA, `optimize` for inbox placement, and `send` only when Send API account workflows are needed.
- Treat recipients, stored messages, logs, template HTML, headers, webhook payloads, and API keys as sensitive.
