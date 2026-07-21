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

## Delegation evidence

- Subagent spawned: `g007_verification_probe` (`/root/g007_verification_probe`).
- Findings integrated: independent 90/90 test baseline; browser, built-runtime, security-scan, and sitemap coverage gaps.
- Serial repository searches before spawn: 0 (worker initialization/state reads excluded).

