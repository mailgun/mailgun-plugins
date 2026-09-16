---
name: deliverability-triage
description: Diagnose Mailgun delivery failures and reputation signals using logs, metrics, suppressions, domains, and bounce classification.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, deliverability, bounces, analytics, suppressions
---

# Deliverability Triage

Use this skill when the user asks why email is failing, landing in spam, bouncing, throttling, or showing poor engagement.

## Intake

Collect any missing context before using tools:

- Domain or domains.
- Region, if not already configured.
- Date range, defaulting to the last 7 days when the user agrees.
- Symptoms: bounces, deferrals, provider blocks, spam placement, low opens, low clicks, or complaint spikes.
- Whether the user wants diagnosis only or also remediation suggestions.

## Workflow

1. Confirm the active region and domain.
2. Start with data gathering: domain details, DNS verification state, recent logs, metrics, bounce classification, and suppression counts.
3. Group failures into permanent bounces, temporary failures, provider throttling, responses similar to blocklist rejections, authentication/DNS issues, and content or template quality issues.
4. Compare current rates to a prior similar window when the user provides enough context.
5. Summarize the most likely root causes with evidence from the Mailgun tools.
6. Recommend next actions, separating diagnostic steps from actions that require confirmation.

## Signals to Check

- Complaint rate near or above 0.1 percent is a serious reputation signal.
- Bounce rate above 2 percent should trigger list quality review, and hard bounce spikes should be treated as urgent.
- Cold domains, cold IPs, and sudden volume jumps often show up as throttling or temporary failures before hard blocking.
- Suppressed recipients can explain missing mail because later sends may be dropped without a request failure.
- Provider specific failures should be grouped separately for Gmail, Microsoft, Yahoo, iCloud, and other major mailbox providers.
- If current analytics are available, use logs and metrics rather than deprecated stats or events endpoints.

## Safety

Do not modify suppressions, tracking, templates, webhooks, IP pools, domain settings, or account settings without explicit confirmation. Do not send test messages unless the user confirms sender, recipient, subject, and whether test mode should be used.
