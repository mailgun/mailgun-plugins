---
name: engagement-analysis
description: Analyze Mailgun opens, clicks, providers, devices, countries, tags, and campaign engagement patterns.
metadata:
  author: Mailgun
  version: 0.1.0
  category: Email
  tags: mailgun, engagement, analytics, tags
---

# Engagement Analysis

Use this skill when the user asks about opens, clicks, campaign performance, provider/device/country behavior, tag performance, or audience engagement.

## Intake

Ask for domain, region, date range, tags or campaigns, desired dimensions, and the business question the user is trying to answer.

## Workflow

1. Use current analytics metrics and logs rather than deprecated stats endpoints when possible.
2. Compare engagement by tag, provider, device, country, template, or sender when the user requests those dimensions.
3. Account for tracking settings. If open or click tracking is disabled, call that out before interpreting missing engagement.
4. Look for abnormal complaint, unsubscribe, and bounce patterns alongside positive engagement.
5. Return practical recommendations, such as segmenting by provider, fixing tracking, testing content, or separating transactional and marketing streams.

## Safety

Do not enable tracking, update templates, change tags, or send follow-up mail without confirmation. Treat engagement logs as sensitive because they can expose recipient behavior.
