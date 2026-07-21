# G007 final local verification evidence

Date: 2026-07-21 UTC

## Scope and source under test

- The source implementation under test is `0e6ba20a3bd38aff39d64292c5d3031d6a724012` (`fix: sanitize browser QA form evidence`).
- That source revision centralizes production-readiness validation and makes metadata, robots, sitemap, canonical URLs, and JSON-LD fail closed unless production mode and every required fact/control are valid.
- It also makes Discord delivery deadlines cover response classification, preserves unknown-delivery semantics on timeout/network failure, requires exactly six published guides while clarifying reviewed care content and sources, and adds high-contrast focus treatment on dark consultation, footer, and guide-next-step surfaces.
- This final update adds a regression guard and sanitizes browser-QA persistence: raw native-form request data exists only ephemerally for assertions, while the committed report records only method, content type, and a sorted allowlisted field-name list. No package manifest, configuration, or plan file was changed, and no deployment was performed.

## Local code and release gates

| Check | Result |
| --- | --- |
| `npm audit --audit-level=high` | PASS — 0 vulnerabilities |
| `npm run lint` | PASS — 0 warnings/errors |
| `npm run typecheck` | PASS — `tsc --noEmit` clean |
| `npm test` | PASS — 116/116 tests in 11 files |
| `npm run build` | PASS — optimized Next.js build and 20 generated routes/pages |
| `node scripts/verify-built-runtime.mjs` | PASS — built Next.js route, header, and form-response sweep |
| `node scripts/verify-repository-boundaries.mjs` | PASS — tracked secret and forbidden auth/CMS/database surface scan |
| `npm run facts:validate:production` | Expected FAIL — exit 1, correctly blocking unresolved production facts and controls |

The strict facts-gate failure is the intended fail-closed result; it is not a build failure or evidence of production readiness. Credential-gated provider settings and human approvals remain unverified.

Package manifests remained byte-identical throughout verification:

- `package.json`: `6b87225fa0e47620b90f450b56dbd8679773d8a6c66b0812533d56b66db2197b`
- `package-lock.json`: `6a509104458397c4b94922f91985ce100b9ed45e024dba164d5ddc92d7103e9d`

## Browser, responsive, and accessibility QA

Fresh Playwright 1.61.1 / Chromium 149 evidence exercised all 14 HTML routes at 360×800, 768×1024, 1280×800, and 1440×900:

- PASS — 56/56 route/viewport checks returned 200 with one `main`, one `h1`, and no horizontal document overflow.
- PASS — zero serious or critical Axe issues across all 56 checks.
- PASS — the intentional 404 returned 404 with one `main`, one `h1`, and zero serious or critical Axe issues.
- PASS — mobile-menu keyboard focus, visible focus indicators, 200% text reflow, reduced motion, forced colors, native form validation, fail-closed preview metadata, and confirmed/unknown/rate-limited recovery-copy journeys.
- PASS — the mobile contact input was not obscured by the sticky CTA, and the tablet CTA remained in normal flow without intersecting the next section.

The browser interception used for representative response pages is only a UI-navigation and recovery-copy simulation. Integration tests remain authoritative for validation, security, Discord delivery, and response generation.

The refreshed `browser-qa.json` contains no raw `postData` and no simulated name, phone, or encoded form values. Each simulated submission persists only `method`, `contentType`, and the sorted allowlisted `fieldNames` proof.

## Dark-surface focus verification

Fresh keyboard traversal against the final built runtime measured the focus outline against each dark surface:

| Surface | Contrast ratio | Minimum | Result |
| --- | ---: | ---: | --- |
| Consultation panel | 7.25:1 | 3:1 | PASS |
| Footer | 13.19:1 | 3:1 | PASS |
| Guide next-step panel | 7.25:1 | 3:1 | PASS |

## Lighthouse evidence

The representative final Lighthouse scores are:

| Viewport | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS | Initial JS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 360×800 | 92 | 100 | 96 | 63 | 1.79s | 328ms | 0 | 155,231 B |
| 768×1024 | 100 | 100 | 96 | 63 | 0.42s | 21ms | 0 | 155,231 B |
| 1280×800 | 100 | 100 | 96 | 63 | 0.41s | 54ms | 0 | 158,047 B |
| 1440×900 | 100 | 100 | 96 | 63 | 0.41s | 41ms | 0 | 158,047 B |

All five fresh 360×800 diagnostic performance scores are disclosed: **78, 79, 88, 92, and 96**. The 79 and 88 runs were exploratory diagnostics. Before the independent acceptance set began, the methodology was declared as three consecutive runs under identical mobile simulated-throttling settings, selecting the median performance score rather than the best score. Those predeclared independent runs scored 78, 96, and 92, so the representative mobile score is the median, **92**. Desktop/tablet viewports use one fresh run each because no desktop performance threshold exists.

`node scripts/verify-lighthouse-budget.mjs` passes all four required viewports: mobile performance ≥90, accessibility and best practices ≥95, CLS ≤0.1, and initial JavaScript ≤165,000 bytes. SEO 63 is expected for this non-production evidence because unresolved release facts intentionally emit `noindex` and omit canonical/JSON-LD publication signals.

## Committed artifacts

- `docs/evidence/g007/browser-qa.json`
- `docs/evidence/g007/dark-focus-qa.json`
- `docs/evidence/g007/lighthouse-summary.json`
- `docs/evidence/g007/home-{360x800,768x1024,1280x800,1440x900}.png`
- `docs/evidence/g007/contact-360x800.png`
- `docs/evidence/g007/home-360x800-forced-colors.png`
- `docs/evidence/g007/SHA256SUMS`

`SHA256SUMS` records every artifact using repository-relative paths and is verified with `sha256sum -c` from the repository root.

## External gates not proven

- Production facts, qualified privacy approval, real Turnstile/Discord/Upstash credentials, and provider-side controls.
- Vercel production deploy/rollback, deployed log/privacy inspection, Discord access/MFA review, and deletion/rotation drills.
- Real phone/Kakao reachability and operator rehearsal.

No deployment was attempted or performed. This evidence supports local verification only.
