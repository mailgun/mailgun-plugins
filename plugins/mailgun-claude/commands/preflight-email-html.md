---
name: preflight-email-html
description: Run Mailgun Inspect Email Preview QA on rendered HTML before sending
---

# Preflight Email HTML

Use the Inspect email preflight skill to run one Mailgun Email Preview QA test on rendered HTML. Ask for the rendered HTML and subject if missing, and do not infer the subject from the HTML.

This command is the user's request to create one preview test, which consumes preview quota and does not send email. Call `run_email_preview_qa` once, resume timeouts with `get_email_preview_qa`, and never create a second test automatically. Report findings and data gaps without a pass or fail verdict.
