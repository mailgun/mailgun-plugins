---
name: sending-template-qa
description: Draft, review, and preflight Mailgun messages and templates before sending or publishing.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, sending, templates, inspect, preview
---

# Sending and Template QA

Use this skill when a user wants to draft an email, review a template, run preview checks, or send a test.

## Intake

Ask for the sender domain, from address, recipient or test seed list, subject, template name/version, region, and whether the user wants test mode. For template updates, ask whether to create a new version or modify metadata.

## Workflow

1. Review the content with the user first.
2. Prefer Inspect preview QA for HTML rendering, links, images, accessibility, and code analysis before any send.
3. Use Validate for recipient checks when deliverability or syntax is in question.
4. If sending, confirm sender, recipient, subject, body/template, test mode, and tags.
5. After a send, retrieve delivery events or logs only when the user asks or when validation requires confirmation.

## Template Variable QA

- Identify required variables from the template and compare them to the planned send payload.
- Check for inconsistent naming, missing variables, reserved variable names, and unresolved placeholders.
- For batch sends, verify every recipient has the variables used by the subject, text body, HTML body, and template.
- Confirm text and HTML versions carry the same essential information.
- For existing templates, verify the intended template version before creating a new version or sending with it.

## Mailgun Gotchas

- Confirm the Mailgun region before sending. US and EU domains must use the matching API region.
- Sandbox domains can send only to authorized recipients.
- When generating direct API examples, use `multipart/form-data` for the Messages API. In curl examples, use `-F` fields rather than a JSON body.
- For batch personalization, validate `recipient-variables` JSON before sending so recipients do not receive unresolved placeholders.
- Avoid template variable names reserved by Mailgun verification flows, including `CODE` and `OTP`.
- Verify template names before sending. A missing template may be accepted at queue time and fail later in delivery logs.

## Safety

Creating an Inspect preview test consumes preview quota. Sending an email contacts external recipients. Both require explicit confirmation. Never place API keys, recipient lists, or private variables in generated source files.
