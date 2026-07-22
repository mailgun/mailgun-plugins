---
name: verify-dns-for-domain
description: Verify Mailgun DNS records for a domain
---

# Verify DNS for a Domain

Ask for domain and region if missing. Check the domain in Mailgun and run DNS verification.

Report SPF, DKIM, MX, and tracking records as a table with expected value, current status, and action needed. Call out region mismatches, missing records, stale records, and propagation caveats.

Do not create, delete, or update the Mailgun domain unless the user explicitly asks and confirms the exact domain and region.
