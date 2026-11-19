---
name: bounce-rate-explanation
description: Explain Mailgun bounce rate changes using metrics, logs, bounce classification, suppression data, provider breakdowns, and list quality signals.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, bounces, analytics, deliverability, suppressions
---

# Bounce Rate Explanation

Use this skill when the user asks why bounce rate is high, why failures increased, which bounce categories are driving a spike, or what list or provider issue may be causing elevated bounces.

Use missing email investigation for one recipient. Use deliverability triage when bounces are only one part of a broader reputation problem.

## Intake

Ask for domain, region, time window, comparison window if available, affected segment or tag, and whether the user wants diagnosis only or cleanup guidance.

## Workflow

1. Retrieve metrics for sent volume, permanent failures, temporary failures, hard bounces, complaint rate, and delivery rate.
2. Compare with a previous similar window when the user provides one or when a sensible baseline can be constructed.
3. Use bounce classification data to group failures by likely cause.
4. Review logs for representative SMTP responses and provider concentrated patterns.
5. Check suppression lists for growth in bounces, complaints, and unsubscribes.
6. Segment by provider, tag, template, sender identity, or domain when those dimensions are relevant.
7. Explain the top drivers and recommend category specific next steps.

## Common Causes

- Invalid or stale recipients, typo domains, no MX domains, or purchased lists.
- Provider throttling or temporary rate limits after sudden volume increases.
- Authentication or DNS issues that cause policy rejection.
- Content, link, or template patterns that trigger provider filtering.
- Suppression effects after previous bounces, complaints, or unsubscribes.

## Safety

Do not remove suppressions, add allowlist entries, resend to bounced recipients, import lists, or change sending configuration without explicit confirmation. For cleanup recommendations, explain the reputation risk before any account mutation.
