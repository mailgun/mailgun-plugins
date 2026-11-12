---
name: platform-operator
description: Guide SaaS and platform teams that use Mailgun subaccounts, IP pools, sending limits, webhooks, and analytics to provide email for their own tenants.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, platform, subaccounts, abuse, operations
---

# Platform Operator

Use this skill when the user runs a SaaS, martech, developer platform, or other service that lets its own customers send email through Mailgun.

Do not use this skill for a single sender managing only its own email program. Use deliverability triage, domain onboarding, or sending QA instead.

## Intake

Ask for the tenant model, subaccount structure, domain ownership model, send volume, IP pool setup, abuse handling process, and whether the user wants architecture guidance or account diagnostics.

## Workflow

1. Identify whether each tenant has its own subaccount, domain, API key scope, and suppression boundary.
2. Review sender onboarding gates: business identity, domain verification, domain age, impersonation risk, and first send limits.
3. Check progressive trust controls: daily caps for new senders, advancement criteria, and rollback paths for risky senders.
4. Review monitoring signals across tenants: hard bounces, complaints, spam trap indicators, blocklist signals, provider throttling, volume spikes, and suppression growth.
5. Inspect IP and pool strategy when available: shared pools, dedicated pools, quarantine pools, warmup status, and tenant isolation.
6. Summarize operational gaps and recommend next steps, separating advisory changes from actions that modify the Mailgun account.

## Operating Guidance

- A platform is accountable for the mail sent through its Mailgun account, even when tenants provide the content and recipient lists.
- Require domain verification before meaningful production sending.
- Treat complaint rates near or above 0.1 percent as urgent, especially for new tenants.
- Pause or limit tenants with sharp bounce spikes, complaint spikes, spam trap indicators, or sudden volume changes until reviewed.
- Maintain a monitored abuse mailbox, complaint intake process, human review queue, and tenant notification path.
- Avoid mixing all tenants into one undifferentiated reputation pool when volume and risk justify stronger isolation.

## Safety

Do not create or change subaccounts, keys, webhooks, IP pools, tracking, suppressions, limits, or account settings without explicit confirmation. For enforcement actions, restate the tenant, account, domain, reason, expected impact, and rollback path before proceeding.
