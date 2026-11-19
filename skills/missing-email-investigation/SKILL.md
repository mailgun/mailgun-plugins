---
name: missing-email-investigation
description: Investigate why a specific Mailgun message did not arrive by checking logs, recipient status, suppressions, timeline evidence, and delivery context.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, delivery, logs, suppressions, support
---

# Missing Email Investigation

Use this skill when the user asks why a specific email did not arrive, whether a recipient got a message, or what happened to a message for a recipient in a known time window.

Use post send analysis for a campaign or tag level review. Use deliverability triage for broad domain or reputation issues.

## Intake

Ask for domain, region, recipient address, approximate send time or time range, and any available message ID, storage key, subject, tag, or template name.

## Workflow

1. Confirm the active region and domain before searching.
2. Query logs for the recipient, message ID, tag, subject, or time window using the narrowest available filter.
3. Build a timeline from accepted, delivered, opened, clicked, temporary failure, permanent failure, complained, unsubscribed, stored, or dropped events when available.
4. Check bounce, unsubscribe, complaint, and allowlist state for the recipient.
5. Retrieve stored message metadata or resend context only when it helps explain the timeline.
6. Classify the likely outcome: delivered, still retrying, suppressed, bounced, rejected by provider, blocked by policy, failed due to template/content, or not found in the chosen window.
7. Return a plain language explanation, evidence table, confidence level, and the next safe action.

## Interpretation

- Accepted or queued is not proof of delivery. Check later log events.
- Suppressed recipients can make later sends appear to vanish without a request error.
- Temporary failures may retry before final delivery or final failure.
- A missing result can mean the wrong region, wrong domain, too narrow a time window, or a send that never reached Mailgun.
- Provider messages and SMTP responses are evidence, but should be summarized carefully and not over interpreted.

## Safety

Keep the investigation diagnostic unless the user explicitly asks for remediation. Do not resend a message, remove a suppression, add an allowlist entry, or change account settings without confirmation of the domain, recipient, message, and expected consequence.
