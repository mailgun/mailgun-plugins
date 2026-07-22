---
name: cross-domain-reporting
description: Compare Mailgun delivery, engagement, failures, and domain health across multiple sending domains.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, reporting, analytics, domains
---

# Cross-Domain Reporting

Use this skill when the user asks to compare performance across Mailgun domains, brands, streams, or subaccounts.

## Intake

Collect the domain list, region, date range, dimensions of interest, and whether the report should optimize for deliverability, engagement, infrastructure health, or executive summary.

## Workflow

1. Verify every requested domain is in the expected region.
2. Query analytics metrics and logs using consistent filters and time windows.
3. Compare delivery rate, failure rate, complaint rate, unsubscribe rate, open/click engagement, provider/device/country splits, and suppression impact when available.
4. Flag domains with DNS, authentication, IP, warmup, or template differences that make the comparison unfair.
5. Produce a short ranked summary and a deeper table of metrics.

## Safety

Keep reporting read-only unless the user asks for remediation. If remediation is requested, create a proposed action plan first and confirm each account change before using mutating tools.
