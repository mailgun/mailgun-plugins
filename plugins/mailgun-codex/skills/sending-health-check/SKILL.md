---
name: sending-health-check
description: Check Mailgun sending health for a domain or account using metrics, logs, bounce classification, suppressions, DNS state, tracking, and existing inbox placement results.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, health, deliverability, metrics, optimize
---

# Sending Health Check

Use this skill when the user asks whether sending is healthy, whether a domain is ready, why reputation may be dropping, or which issue should be fixed first.

Use campaign preflight for a specific upcoming send. Use missing email investigation for one recipient or message.

## Intake

Ask for domain or domains, region, time window, traffic type, and whether the user has an existing inbox placement test result to review.

## Workflow

1. Confirm domain and region, then inspect domain verification and tracking settings.
2. Use metrics summaries for sent volume, delivery rate, temporary failure rate, permanent failure rate, bounce rate, complaint rate, unsubscribe rate, and engagement when available.
3. Review logs for representative failures and provider concentrated issues.
4. Check suppressions and bounce classification when bounce or drop rates are elevated.
5. Review IP, IP pool, warmup, and sending queue context when available and relevant.
6. Include existing inbox placement results when the user provides a result ID or when results are available through the MCP.
7. Identify the single most important issue first, then list secondary observations and next steps.

## Output

Return a compact report with:

- Health status: healthy, watch, degraded, or critical.
- Primary issue with severity and evidence.
- Key metric table for the selected window.
- Product or data gaps, such as no tracking, no inbox placement result, or insufficient logs.
- Recommended next steps separated into diagnostics and account changes.

## Safety

Do not change tracking, domain settings, IP pools, webhooks, suppressions, limits, or templates without explicit confirmation. Treat health data as customer operational data and summarize only what is needed.
