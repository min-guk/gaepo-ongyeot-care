# Privacy and data-flow disclosure source

Status: **qualified-review draft — unapproved**. The public `/privacy` page must remain visibly unapproved and online forms must stay disabled until both verified `privacyNoticeVersion` and `privacyReview` facts exist and `PRIVACY_REVIEW_APPROVED=true` is configured. This document is an implementation record, not a statutory privacy notice.

## Exact field matrix

| Route | Visitor fields | Generated server fields | Never accepted |
| --- | --- | --- | --- |
| Care | name, phone, preferred contact time, coarse area, one fixed topic, privacy notice version, Turnstile token, empty honeypot | request type, request ID, submitted-at time | free text, diagnosis/health detail, resident number, detailed address, care notes, files |
| Recruitment | name, phone, preferred contact time, coarse area, privacy notice version, Turnstile token, empty honeypot | request type, request ID, submitted-at time | free text, resume, career narrative, resident number, detailed address, files |

Flow: browser → same-origin Next endpoint → exact-schema and notice-version check → Turnstile → HMAC(phone, secret pepper) Upstash rate limit → route-specific private Discord webhook with `wait=true` → confirmed only after a realistic bounded decimal Discord Snowflake message ID. App logs contain only the server-generated request ID, route, outcome, latency bucket, and upstream status class. The request ID is returned to the browser only for confirmed submissions; it is never placed in a URL. No form values are placed in URLs, logs, analytics, workflow artifacts, or source control.

Discord is an initial lead inbox, not a CRM or care-record system. Delete each message after follow-up or within 30 days, whichever is earlier. Retain only deletion date and aggregate count. Before approval, a qualified reviewer must reconcile the public notice with the actual Vercel/provider logs, Upstash, Cloudflare Turnstile, Discord, Kakao, retention, third-party/processor and overseas-processing configuration, refusal consequences, rights request channel, and verified operator identity/contact facts.
