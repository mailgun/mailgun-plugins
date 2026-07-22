---
name: domain-onboarding-dns-verification
description: Guide Mailgun domain onboarding and DNS verification for SPF, DKIM, MX, tracking, and regional configuration.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, domains, dns, onboarding, dkim
---

# Domain Onboarding and DNS Verification

Use this skill when a user is adding a domain, checking DNS, or trying to understand why a domain is not verified.

## Intake

Ask for the domain, intended Mailgun region (`us` or `eu`), and whether the domain already exists in Mailgun. Confirm whether the user wants guidance only or wants the agent to create/update domain configuration.

## Workflow

1. Inspect the existing domain record when it exists.
2. Verify DNS through Mailgun before suggesting changes.
3. Explain SPF, DKIM, MX, CNAME/tracking, and inbound route implications separately.
4. Point out region mismatch risks. EU domains must use EU hosts and US domains must use US hosts.
5. When DNS is missing or stale, provide exact records and a verification checklist.
6. If the user wants account changes, confirm the domain, region, and desired action before calling mutating tools.

## Output

Return a compact table with record type, host/name, expected value, observed state, and action needed. End with the next verification step and expected DNS propagation caveats.
