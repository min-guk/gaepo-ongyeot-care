# Privacy, credentials, Discord, content, and outage runbook

Production actions require an authorized named operator and two-person review. Never paste a secret, webhook URL, token, form value, Discord message, or provider-log record into issues, commits, chat, screenshots, or evidence templates.

## Discord access and deletion

1. Give care and recruitment access only to staff who actively triage that route; use separate private channels and separate webhooks. Require MFA on every human account and the minimum Discord role permissions.
2. Monthly and on every staff change, export/read the channel roster, compare it to the approved roster, verify MFA evidence without storing recovery codes, and immediately remove former or transferred staff. Rotate the affected webhook if access may have persisted.
3. Weekly, delete resolved lead messages; delete every remaining lead before it reaches 30 days. Record only UTC review date, route, oldest-message age band, deleted count, reviewer, and exception ticket. Never record names, phones, message IDs, or message text.

## Secret rotation

Rotate Discord care/recruitment webhooks independently, Turnstile secret/site key, `RATE_LIMIT_PEPPER`, Upstash REST token, and Kakao credential/channel integration at the provider first, update staging secrets, exercise staging, update production only under separate authorization, verify, then revoke the old credential. Changing the pepper resets rate buckets. Never reuse a care webhook for recruitment. After suspected exposure, revoke first, disable online forms, then investigate using non-PII timestamps/status classes.

## Unknown delivery and outage

Timeout, reset, Discord `5xx`, or malformed `2xx` is not success and must not be automatically retried. Keep phone/Kakao fallback visible when verified; ask the visitor to check by that path without claiming receipt. For Discord, Turnstile, Upstash, or endpoint outage: set `PRIVACY_REVIEW_APPROVED=false` or remove the public Turnstile key to disable forms, post a non-PII service notice if authorized, assign an incident owner, inspect provider status/log metadata, and restore only after staging care and recruitment synthetics both return `confirmed`. Emergency shutdown is the same fail-closed gate; do not delete evidence or redeploy blindly.

### Emergency form shutdown deployment

1. In the authorized deployment configuration, set `PRIVACY_REVIEW_APPROVED=false` or remove `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Record only the incident ID, operator, revision, and UTC time.
2. Check out the intended revision, run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`, and stop if any gate fails. The shutdown is a rebuilt artifact, not a runtime-only assumption.
3. Redeploy that exact successful build through the normal reviewed production deployment control. Do not reuse an older artifact or bypass required approval.
4. Fetch the deployed `/contact` and `/recruitment` pages as HTML. Verify the 정적 HTML (static HTML) contains the disabled-form/privacy-review message, contains no enabled submit control, and still exposes only any independently verified phone or Kakao fallback.
5. Confirm both routes remain usable without client JavaScript, preserve `noindex` response behavior for form outcomes, and record status codes, revision, and UTC verification time without visitor data. Restore forms only by repeating the rebuild, reviewed redeploy, static HTML checks, and staging synthetics with approved configuration.

## Content preview, update, and rollback

The content steward edits source on a branch, updates sources/review dates, runs lint/typecheck/tests/build, reviews a noindex preview, obtains required content/privacy approval, then merges through the normal deployment control. To roll back, revert the offending commit, run the same gates, preview, and redeploy the known-good revision. For an urgent harmful claim, disable the affected route or roll back first; document the commit and timestamps, not visitor data. Rehearse update and rollback monthly with a non-sensitive text-only change.

## Provider logs and privacy review

Quarterly and after provider changes, inspect real Vercel/edge/security, Turnstile, Upstash, Discord, and Kakao metadata/retention settings. Confirm that request bodies and secrets are absent and reconcile actual regions, processors, retention, access, and overseas handling with the qualified-review draft. Code cannot prove these deployed settings.
