---
name: address-validation
description: Validate individual email addresses and sampled recipient lists with Mailgun Validate before signup, import, campaign, or cleanup workflows.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, validate, email, list-hygiene
---

# Address Validation

Use this skill when the user wants to check an email address, improve signup quality, review a recipient sample, or reduce bounce and complaint risk before importing or sending to a list.

Use campaign preflight when validation is one part of a broader send-readiness review. Use bounce and suppression analysis when the address is already suppressed or has prior failure history.

## MCP Scope

The packaged MCP exposes single-address validation through Mailgun Validate. Do not claim that this plugin can run Mailgun bulk validation jobs, list health previews, or download bulk result files unless those tools are added to the MCP server later.

## Intake

Ask for the address or sampled addresses, region, workflow purpose, whether the address is for transactional or marketing mail, and whether the user wants a recommendation or only raw validation results.

## Workflow

1. Validate each address or sample address with the Mailgun Validate tool.
2. Review result, risk, disposable address flag, role address flag, typo suggestion, and engagement signal when available.
3. For signup or checkout, recommend blocking or warning on invalid, high risk, disposable, or typo-suspected addresses.
4. For marketing, treat catch-all, role, disposable, high risk, or unknown results more cautiously than low risk deliverable addresses.
5. For imported lists, validate a representative sample first and recommend a full list hygiene process when sample quality is poor.
6. Check suppressions before recommending a send to an address that has previously bounced, complained, or unsubscribed.
7. Return an action-oriented result: accept, warn, correct typo, suppress, review manually, or do not send.

## Interpretation

- Result and risk are separate signals. A deliverable address can still be risky.
- Catch-all domains may accept mail for nonexistent recipients, so treat them as uncertain for marketing.
- Role addresses such as `info@` or `support@` can be acceptable for transactional mail but risky for campaigns.
- Disposable addresses are usually poor candidates for account creation and marketing lists.
- Typo suggestions should be surfaced to the user rather than silently rewriting the address.

## Safety

Email addresses and validation results are personal data. Do not log full lists, commit addresses to source files, or paste bulk recipient data into generated code. Never expose `MAILGUN_API_KEY` in client-side code, logs, or committed files.
