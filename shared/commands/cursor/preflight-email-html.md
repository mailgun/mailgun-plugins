---
name: preflight-email-html
description: Run Mailgun Inspect Email Preview QA on rendered HTML before sending
---

# Preflight Email HTML

Use the Inspect email preflight skill to run one Mailgun Email Preview QA test on rendered HTML.

If missing, ask for the rendered HTML (inline, a rendered `.html` file, or a documented render command) and the subject line. Do not infer the subject from the HTML. Ask whether the user wants the full check set, only links and images, accessibility, or a specific set of email clients.

This command is the user's request to create one preview test, which consumes preview quota and does not send email. Call `run_email_preview_qa` once. If it times out, resume with `get_email_preview_qa`; never create a second test automatically.

Summarize the outcome, `test_id`, checks run and not run, priority findings, client render status, and data gaps. Do not declare a pass or fail verdict.
