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

## Review Checks

- SPF should include the Mailgun sending include for the domain's region and stay under the DNS lookup limit.
- DKIM must publish the selector records Mailgun expects for the domain.
- DMARC can start at monitoring mode, but production programs should have a rollout path toward enforcement.
- MX records matter for inbound routes and can also improve trust for send only domains.
- Tracking CNAME records should match the configured tracking settings before interpreting open or click gaps.
- New domains and dedicated IPs need gradual warmup before large sends.

## Sender Readiness

- Confirm the From address uses a verified domain the recipient will recognize.
- For a new sender identity, recommend test mode, preview QA, or a small seed send before wider use.
- Redirect to campaign preflight when domain readiness is part of a bulk or launch send.
- Redirect to inbound routing troubleshooting when the problem is receiving mail, route matching, or inbound webhooks.

## Output

Return a compact table with record type, host/name, expected value, observed state, and action needed. End with the next verification step and expected DNS propagation caveats.
