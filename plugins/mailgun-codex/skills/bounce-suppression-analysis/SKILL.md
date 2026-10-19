---
name: bounce-suppression-analysis
description: Analyze Mailgun bounces, complaints, unsubscribes, allowlists, and suppression effects for a domain.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, suppressions, bounces, complaints, unsubscribes
---

# Bounce and Suppression Analysis

Use this skill when the user asks about suppressed recipients, bounces, complaints, unsubscribes, or why Mailgun is dropping messages.

## Intake

Collect the domain, date range, recipient or list segment if relevant, and whether the user wants analysis only or cleanup guidance.

## Workflow

1. Query suppression lists and recent logs for the domain.
2. Separate bounces, complaints, unsubscribes, and allowlist entries.
3. Identify whether drops are caused by suppressions, recent permanent failures, complaint policy, unsubscribes, or list hygiene problems.
4. For individual recipients, check the narrowest relevant suppression type first.
5. Recommend cleanup only after explaining the risk of sending to suppressed contacts again.

## Interpretation

- Permanent failures, complaints, and unsubscribes can place recipients on suppression lists.
- Temporary failures usually retry and should not be treated the same as permanent bounces.
- A recipient on a suppression list can make later sends appear to vanish unless logs are checked.
- Repeated soft failures to the same recipient can still indicate a list quality problem.
- Complaint suppressions carry higher reputation risk than ordinary bounces and need extra caution before any allowlist action.

## Safety

Never delete suppression entries, import suppressions, add allowlist entries, or resend to affected recipients without explicit confirmation. If the user asks to remove suppressions, restate the address, suppression type, domain, and expected consequence before proceeding.
