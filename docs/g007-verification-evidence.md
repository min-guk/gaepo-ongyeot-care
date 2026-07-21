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

## Final local code gates

| Check | Result |
| --- | --- |
| `npm audit --audit-level=high` | PASS — 0 vulnerabilities |
| `npm run lint` | PASS — 0 warnings/errors |
| `npm run typecheck` | PASS — `tsc --noEmit` clean |
| `npm test` | PASS — 90/90 tests in 10 files |
| `npm run build` | PASS — optimized Next.js build and 20 generated routes/pages |

The build's preview-mode fact warning is expected and documents unresolved external release gates rather than a compilation failure. SHA-256 values were identical before and after the full gate run:

- `package.json`: `6b87225fa0e47620b90f450b56dbd8679773d8a6c66b0812533d56b66db2197b`
- `package-lock.json`: `6a509104458397c4b94922f91985ce100b9ed45e024dba164d5ddc92d7103e9d`

## Content, fact, and repository boundaries

- `npm test -- tests/unit/guides.test.tsx tests/unit/site-config.test.ts tests/unit/privacy-seo-operations.test.tsx`: PASS, 20/20. This covers 30/90/180-day content classes, inclusive due-date behavior, the 14-day warning window, verified-fact shape/provenance/date validation, and preview SEO fail-closed behavior.
- `npm run facts:validate:production`: expected FAIL (exit 1). The strict gate named all unresolved public facts, release controls, route-specific Discord configuration, and qualified privacy approval instead of building a false-ready production release.
- `node scripts/verify-repository-boundaries.mjs`: PASS. The dependency-free scanner checks exact auth/CMS/database package and route denylists, permits only tracked `.env.example`, scans tracked text for high-confidence secret signatures, and scans built browser assets for server-only configuration names and secret signatures.

The scans are intentionally high-confidence and repository-local: they do not claim that credential-gated provider settings, deployment logs, Discord access/MFA, or deletion/rotation drills were verified.

## Browser, responsive, accessibility, and performance QA

The production Next server was exercised with transient Playwright 1.61.1, Chromium 149, the repository's Axe 4.12.1 runtime, and Lighthouse 12.8.2. The browser sweep covered all 14 HTML routes at 360×800, 768×1024, 1280×800, and 1440×900:

- PASS — 56 route/viewport navigations returned 200 with one `main`, one `h1`, and no horizontal document overflow.
- PASS — zero serious or critical Axe findings across all 56 checks.
- PASS — keyboard focus was visibly rendered and the 360px contact input was not obscured by the mobile sticky CTA.
- PASS — reduced-motion and forced-colors browser emulation was active with no horizontal overflow.
- PASS — unresolved preview metadata remained fail-closed: Korean document language, `noindex`, no canonical, no JSON-LD, `robots.txt` disallowing `/`, and an empty sitemap.
- Visual inspection of the generated mobile/desktop/forced-colors screenshots found no clipping, broken Korean wrapping, or CTA/footer collision.

Lighthouse results:

| Viewport | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 360×800 | 97 | 100 | 96 | 63 | 1.32s | 207ms | 0 |
| 768×1024 | 86 | 100 | 96 | 63 | 2.28s | 126ms | 0 |
| 1280×800 | 85 | 100 | 96 | 63 | 2.29s | 133ms | 0 |
| 1440×900, isolated rerun | 82 | 100 | 96 | 63 | 2.34s | 162ms | 0 |

The accepted mobile performance target passes. The isolated 1440 result remained below 90; Lighthouse attributes the principal opportunity to 29 KiB of unused and 13 KiB of legacy JavaScript in the Next.js client runtime. A reproducible budget now blocks mobile performance below 90, accessibility/best-practices below 95, CLS above 0.1, or initial script transfer above 165,000 bytes at any required viewport. Desktop performance remains a documented optimization risk rather than being represented as passing. SEO 63 is not a production score: unresolved release facts intentionally emit `noindex` and omit canonical/JSON-LD.

Artifacts:

- `docs/evidence/g007/browser-qa.json`
- `docs/evidence/g007/lighthouse-summary.json`
- `docs/evidence/g007/home-{360x800,768x1024,1280x800,1440x900}.png`
- `docs/evidence/g007/contact-360x800.png`
- `docs/evidence/g007/home-360x800-forced-colors.png`

Tooling deviation: the first transient Chromium launch failed because `libgbm.so.1` was absent. `playwright install-deps chromium` was then run and completed an apt/dpkg system-package transaction. It was allowed to finish rather than interrupting dpkg; no further system-package mutation was performed. Browser/npm caches remained outside the repository, and the repository `package.json` and `package-lock.json` hashes stayed byte-identical.

## Delegation evidence

- Subagent spawned: `g007_verification_probe` (`/root/g007_verification_probe`).
- Findings integrated: independent 90/90 test baseline; browser, built-runtime, security-scan, and sitemap coverage gaps.
- Serial repository searches before spawn: 0 (worker initialization/state reads excluded).
