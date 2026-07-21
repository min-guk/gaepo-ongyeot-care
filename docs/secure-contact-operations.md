# Secure contact operations

## Data boundary

- Care accepts only name, normalized phone, preferred contact time, coarse area, one fixed topic, and the currently verified privacy-notice version.
- Recruitment accepts the same fields without a topic. Request ID, request type, and server time are generated server-side.
- There is no memo/free-text field, health field, detailed address, resident number, upload, database, booking, payment, account, or CMS path.
- Discord is the private operational inbox, not a care-record or CRM. Delete lead messages within 30 days or sooner after follow-up; record only deletion date and count.

## Required production controls

Production remains blocked until the verified fact gate passes and these server-only variables are configured: Turnstile secret, 32+ character rate pepper, separate care and recruitment Discord webhooks, and Upstash Redis REST URL/token. The public Turnstile site key is the only browser-visible integration value.

The rate adapter performs one atomic Redis script per HMAC-derived route/phone key, allows five attempts per 60 seconds, and fails closed when missing or unavailable. Never send a raw phone number or IP address to the rate service.

## Delivery semantics

- Discord requests always use `wait=true`, `allowed_mentions.parse=[]`, a bounded deadline, and route-specific private webhooks.
- Only a non-empty returned Discord message ID is confirmed success.
- Retry exactly once only for an explicit `429` with a bounded numeric `Retry-After`.
- Timeout, reset, and `5xx` are unknown delivery and are never retried. Other `4xx`, invalid webhook configuration, and `2xx` without an ID are known failures.
- All results are endpoint-generated, no-store/noindex, vary on `Accept`, and include a request ID only for confirmed success. GET/HEAD never show success.

## Logging and outage response

Application events contain only request type, outcome, latency bucket, and upstream status class. Do not log names, phones, request IDs, form bodies, URLs containing values, Turnstile tokens, webhook URLs/bodies, raw IPs, or exception objects.

For unknown delivery, do not resubmit automatically. Ask the visitor to verify by the fact-gated phone or Kakao path. Rotate any exposed webhook, Turnstile secret, rate token, or pepper immediately; changing the pepper intentionally resets rate keys.
