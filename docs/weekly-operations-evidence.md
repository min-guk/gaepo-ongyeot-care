# Weekly operations checklist and evidence template

## Code-verifiable controls

- [ ] Production facts/privacy gate still rejects unresolved configuration.
- [ ] Forms are disabled without verified privacy notice, verified review, explicit approval, and Turnstile public key.
- [ ] Exact schemas prohibit free text/uploads and safe logs retain no payload.
- [ ] Discord success still requires `wait=true` and a message ID; unknown delivery is never retried.
- [ ] Robots/noindex, sitemap, canonical, Open Graph, and JSON-LD emit verified facts only.
- [ ] Synthetic runner rejects production/equal/unallowlisted hosts, uses fixed fixtures, requires `confirmed`, has forced failure, and uploads no artifacts.
- Evidence: commit ___; CI run URL ___; lint ___; typecheck ___; tests ___; build ___.

## Operator-only controls (never mark proven by code)

- [ ] Deployment remains unauthorized or deployment approval/evidence is separately recorded.
- [ ] Qualified privacy reviewer reconciled the actual processors, overseas handling, provider logs, retention, refusal and rights-contact details.
- [ ] Discord care/recruitment roster is least privilege; every human has MFA; former staff removed.
- [ ] Weekly deletion completed within 30 days. Date ___; care count ___; recruitment count ___; no identifiers recorded.
- [ ] Discord webhooks, Turnstile, rate pepper, Upstash, and Kakao rotation dates/owners reviewed; expired/exposed credentials revoked.
- [ ] Vercel/edge, Turnstile, Upstash, Discord, and Kakao log metadata/retention checked without copying PII.
- [ ] Both staging synthetics passed; phone/Kakao fallback checked; no production contact occurred.
- [ ] Forced-failure GitHub email reached the maintainer independently of Discord.
- [ ] Content preview/update/rollback and emergency form-shutdown drills completed.
- Evidence references (URLs/tickets/date-count only; no PII or secrets): ___.
