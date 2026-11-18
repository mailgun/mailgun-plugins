---
name: mailgun-docs-lookup
description: Answer questions about Mailgun APIs, features, limits, and setup from the official documentation through the Mailgun Docs MCP. Use when the user asks which endpoint, parameter, header, region, or product does something, or how a Mailgun feature works.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, documentation, api-reference
---

# Mailgun Docs Lookup

Use this skill to ground answers about Mailgun in the official documentation instead of memory.

## MCP Scope

The `mailgun-docs` MCP server searches the documentation at https://documentation.mailgun.com and returns OpenAPI details for the Mailgun Send, Validate, Inspect, and Optimize APIs. It does not access the user's Mailgun account, so it cannot list their domains, read their logs, or change settings. Say so when the user asks for account data.

## Workflow

1. Decide which sandbox tools the question needs: `search` for guides and concepts, `listApis`, `getEndpoints`, and `getEndpointInfo` for API details, `getSecuritySchemes` for authentication.
2. Call `describe-tools` once with only those names, then run a single `execute` script that chains the calls and returns only what the answer needs.
3. When several APIs share a title, pick the definition by its file path, for example `docs/mailgun/api-reference/send/mailgun.yaml` for the Send API.
4. Answer with the method, path, required and optional parameters, and the US and EU base URLs (`https://api.mailgun.net` and `https://api.eu.mailgun.net`) when relevant.
5. Link the documentation page the answer came from. If the docs do not cover the question, say so rather than guessing.
