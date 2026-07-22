---
name: campaign-preflight
description: Review Mailgun sender readiness, recipients, suppressions, templates, previews, and safety checks before a bulk or important send.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, campaign, sending, validate, inspect
---

# Campaign Preflight

Use this skill when the user is preparing a bulk send, campaign, launch announcement, migration notice, or any message where delivery quality and safety matter before sending.

Use sending and template QA for a simple test message. Use this skill when the workflow needs readiness checks across sender identity, audience, content, and operational risk.

## Intake

Ask for domain, region, sender identity, recipient source or list segment, message purpose, template or content, expected volume, send timing, and whether the user wants planning only or a live send.

## Workflow

1. Confirm the domain exists in the expected region and DNS verification is healthy.
2. Check sender identity readiness: recognizable From address, verified domain, tracking settings, and whether the domain or IP is cold.
3. Review recipients before sending. Use Validate when checking individual addresses or samples, and review suppressions, unsubscribes, complaints, and allowlist entries when relevant.
4. Review the template or content. Confirm variables, text and HTML coverage, unsubscribe or preference links for bulk mail, and brand alignment.
5. Prefer Inspect preview QA for HTML rendering, links, images, accessibility, and code analysis before production use.
6. Check recent logs, metrics, bounce classification, inbox placement, or blocklist signals when the user has enough account data and the campaign has reputation risk.
7. Produce a go, hold, or fix first recommendation with evidence and specific next steps.

## Bulk Send Guardrails

- Treat bulk sends as higher risk than transactional tests.
- Avoid sending to purchased, scraped, stale, or unvalidated lists.
- Recommend gradual rollout for cold domains, cold IPs, new sender identities, or unusually large volume jumps.
- Confirm exclusions for unsubscribes, complaints, bounces, and internal suppression rules before recommending a live send.
- If batch personalization is used, validate `recipient-variables` JSON and check that required variables exist.

## Safety

Do not send email, create preview tests, change templates, change tracking, modify suppressions, or update domain settings without explicit confirmation. Before any live send, restate the domain, sender, recipients or segment, subject, content or template, test mode setting, expected volume, and region.
