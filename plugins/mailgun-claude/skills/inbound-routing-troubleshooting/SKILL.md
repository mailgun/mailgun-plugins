---
name: inbound-routing-troubleshooting
description: Diagnose Mailgun inbound route, webhook, mailing list, and DNS issues without confusing inbound receipt problems with outbound delivery problems.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, inbound, routes, webhooks, dns
---

# Inbound Routing Troubleshooting

Use this skill when the user is debugging incoming mail to Mailgun, route matching, route forwarding, webhook delivery, parsing behavior, or messages that should trigger an inbound workflow.

Do not use this skill for outbound deliverability issues. Use deliverability triage or post send analysis for sent mail.

## Intake

Ask for the receiving domain, region, expected recipient address, route expression or route ID, webhook target, approximate time of the inbound test, and what the user expected to happen.

## Workflow

1. Verify the domain exists in the expected Mailgun region and review relevant MX records.
2. Inspect routes and route priority. Confirm the route expression can match the recipient address and that another route is not taking precedence.
3. Inspect route actions such as forwarding, storing, stopping, or webhook posting.
4. Check domain webhooks when inbound handling depends on HTTP callbacks.
5. Review mailing list configuration when inbound mail should go to a list address or member workflow.
6. Separate DNS issues, route matching issues, webhook endpoint issues, and application side parsing issues.
7. Return the likely failure point, evidence, and the next test to run.

## Safety

Do not create or update routes, webhooks, mailing lists, members, DNS guidance, or domain settings without explicit confirmation. Webhook payloads and inbound message content can contain sensitive customer data, so summarize only what is needed.
