---
name: audit-domain-health
description: Audit Mailgun domain health, DNS verification, tracking, and recent delivery risk
---

# Audit Mailgun Domain Health

Run a read-only domain health audit.

If missing, ask for domain, region, and date range. Default the date range to the last 7 days only after the user accepts.

Use domain details, DNS verification, tracking settings, analytics metrics/logs, suppressions, and bounce classification where available. Summarize:

- Verification and DNS status.
- Authentication risks.
- Recent delivery/failure trends.
- Suppression and complaint signals.
- Recommended next actions, with mutating actions clearly separated and requiring confirmation.
