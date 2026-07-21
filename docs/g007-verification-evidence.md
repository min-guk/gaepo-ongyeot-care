# G007 local verification evidence

Date: 2026-07-21 UTC

## Scope and architecture decision

- The accepted G007 goal is local verification and delivery; credential-gated production operations remain operator-owned.
- `docs/architecture-spike.md` records `SWITCH_NEXT_VERCEL`, so the superseded Astro/workerd checks are replaced by verification of the built Next.js runtime.
- The repository intentionally has no application database, account/authentication surface, CMS, upload, booking, or payment dependency.

## Baseline inspection

- `npm audit --audit-level=high`: PASS, 0 vulnerabilities.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm test`: PASS, 90 tests in 10 files.
- `npm run build`: PASS; Next.js generated 20 routes/pages. Preview fact validation warned about unresolved release facts and controls as designed.
- `npm run facts:validate:production`: pending final evidence; it is expected to fail closed until external facts, credentials, and qualified privacy approval exist.

Existing tests cover schema allowlists, rate-key derivation, Discord confirmed-delivery semantics, safe logging, inquiry validation order, GET/HEAD 405 behavior, content freshness, public fact gates, and preview SEO helpers.

## Identified verification gaps

- No browser harness currently proves responsive screenshots, automated accessibility, horizontal overflow, focus, forced colors, reduced motion, or Lighthouse scores.
- No repository script currently runs a built-server route/API/header sweep.
- No automated tracked-source/bundle secret scan or auth/CMS surface denylist exists.
- The sitemap helper currently includes only top-level public routes; guide detail route coverage must be checked.

## Reproducible built-runtime QA

After `npm run build`, run:

```bash
node scripts/verify-built-runtime.mjs
```

The dependency-free Node script starts `next start` on loopback, waits for readiness, verifies every public route plus the 404 path and security headers, exercises care/recruitment GET and HEAD 405 behavior, and checks invalid JSON/HTML POST responses for `no-store`, `noindex`, exact safe status, recovery copy, and absence of false-success/request-ID content. It refuses non-loopback targets and terminates its child server in `finally`.

Deterministic unknown-delivery black-box testing would require a test-only upstream seam and verified synthetic release configuration. The existing integration suite instead proves both Turnstile transport failure and Discord 5xx map to a 503 unknown state without false success or request-ID leakage.

## Delegation evidence

- Subagent spawned: `g007_verification_probe` (`/root/g007_verification_probe`).
- Findings integrated: independent 90/90 test baseline; browser, built-runtime, security-scan, and sitemap coverage gaps.
- Serial repository searches before spawn: 0 (worker initialization/state reads excluded).
