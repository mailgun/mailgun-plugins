---
name: verify-dns-for-domain
description: Verify Mailgun DNS records (SPF, DKIM, MX, tracking) for a domain. Use when the user is onboarding a domain, asks whether DNS is set up correctly, or a domain shows as unverified.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, dns, spf, dkim, domains
---

# Verify DNS for a Domain

Ask for domain and region if missing. Check the domain in Mailgun and run DNS verification.

Report SPF, DKIM, MX, and tracking records as a table with expected value, current status, and action needed. Do not create, delete, or update the Mailgun domain unless the user explicitly asks and confirms the exact domain and region.
