---
name: post-send-analysis
description: Analyze what happened after a Mailgun send using logs, metrics, suppressions, bounce classification, engagement, and template or domain context.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, analytics, logs, delivery, engagement
---

# Post Send Analysis

Use this skill when the user asks how a send performed, why a campaign underperformed, what happened after a message was sent, or whether a delivery issue is tied to a domain, recipient group, campaign, tag, template, or provider.

Use deliverability triage for broad ongoing failure diagnosis. Use this skill for a bounded review of one send, campaign, template, tag, or time window.

## Intake

Ask for domain, region, date range, message ID or storage key when available, campaign tag, template name/version, recipient segment, and the question the user wants answered.

## Workflow

1. Define the analysis window and compare it to a previous similar window when useful.
2. Query logs and metrics for delivery, permanent failures, temporary failures, complaints, unsubscribes, opens, clicks, providers, devices, and countries.
3. Check suppressions when recipients report missing mail or logs show dropped messages.
4. Use bounce classification when failures need category level explanation.
5. Segment findings by domain, provider, tag, template, sender identity, recipient group, or subaccount when those dimensions are relevant.
6. Identify whether the issue appears domain specific, recipient specific, campaign specific, template specific, provider specific, or caused by suppressions.
7. Return a concise summary, evidence table, likely causes, data gaps, and safe next steps.

## Interpretation

- Missing opens or clicks can be caused by disabled tracking, per message tracking overrides, client privacy behavior, or low engagement.
- A queued or accepted send can still fail later, so use logs rather than only the original API response.
- Suppressed recipients may not produce an obvious send failure to the caller.
- Provider concentrated failures deserve separate diagnosis from account wide failures.
- Complaint rate, bounce rate, and unsubscribes should be reviewed alongside positive engagement.

## Safety

Keep analysis diagnostic unless the user asks for remediation. Do not resend, remove suppressions, modify templates, change tracking, or alter account settings without explicit confirmation.
