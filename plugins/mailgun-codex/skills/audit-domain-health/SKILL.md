---
name: audit-domain-health
description: Audit Mailgun domain health, DNS verification, tracking, and recent delivery risk without changing the account. Use when the user asks for a domain health check, audit, or overall status of a Mailgun sending domain.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, audit, domain, dns, deliverability
---

# Audit Mailgun Domain Health

Run a Mailgun domain health audit without changing the account.

If missing, ask for domain, region, and date range. Default the date range to the last 7 days only after the user accepts.

Use domain details, DNS verification, tracking settings, analytics metrics/logs, suppressions, and bounce classification where available. Summarize verification status, authentication risks, recent delivery trends, suppression signals, and next actions.
