# G001 Architecture Spike — SWITCH_NEXT_VERCEL

Date: 2026-07-21

## Decision

`SWITCH_NEXT_VERCEL` before shared UI/content implementation. The Node 20 vertical slice proves Astro mixed rendering and Cloudflare workerd compatibility without an external deployment, but the mandatory security gate fails: the latest Node-20-compatible Astro/adapter line still has unresolved production audit findings whose patched framework/adapter line requires Node 22. The spike is retained as executable migration-contract evidence, not as an approved production baseline.

## Pinned Node-20-compatible stack

- Node `>=20.3 <21`
- Astro `5.18.2` (latest Node-20-compatible Astro 5 release confirmed by npm metadata research on 2026-07-21; current Astro 7 requires Node 22.)
- `@astrojs/cloudflare` `12.6.13` (latest adapter 12 line compatible with Astro 5)
- Wrangler `4.86.0` (Node 20 compatible)
- TypeScript `5.9.3`, Vitest `3.2.7`

Versions are exact in `package.json` and the npm lockfile. Upgrade ownership must re-check Node engines, adapter peer compatibility, build output, workerd smoke tests, and the dry-run bundle.

## Evidence and boundaries

- `output: "server"` with explicitly prerendered `/` and `/contact`; the inquiry endpoint is explicitly on-demand.
- Semantic `/contact` form posts natively to `/api/inquiries/care`.
- Runtime-neutral TypeScript modules own exact validation, HMAC rate key, Turnstile, Discord delivery semantics, and response negotiation.
- GET/HEAD are 405 with `Allow: POST`; only confirmed Discord message IDs can produce success.
- HTML/JSON POST outcomes are selected by `Accept` and use `no-store`, `noindex`, and `Vary: Accept`.
- Wrangler disables invocation logs and defines the mandatory five-per-60-second rate-limit binding.
- Wrangler enables `nodejs_compat` because the pinned Astro/Cloudflare server bundle includes Node-compatible image/runtime imports; the workerd smoke test guards this compatibility requirement.
- No application database, session, auth, CMS, queue, upload, or public result URL exists.

## Local verification

Run:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:workerd
npm run dry-run
```

`test:workerd` starts Wrangler locally, verifies the prerendered form, exercises GET/HEAD false-success guards, and proves a JavaScript-off native POST fails safely with an accessible phone fallback. `dry-run` validates Worker config and produces the upload bundle but never deploys.

## Logging and migration boundary

Application code intentionally emits no form/payload logs. Wrangler invocation logs are disabled; actual edge/security telemetry must be inspected in credentialed staging. Domain modules import no Astro or Cloudflare request types, so a Next.js/Vercel fallback can retain validation, HMAC, Turnstile, notification, and response semantics behind a different route adapter.

## External release blockers

- No production or staging deployment was performed by this spike.
- Real binding enforcement is not provable in permissive local emulation.
- Real Turnstile, Discord message-ID confirmation, webhook rotation, access/MFA, deletion, and telemetry require authorized credentials.
- Current Cloudflare plan/cost and a maintainer deploy/rollback/content rehearsal require operator confirmation.
- `npm audit --omit=dev` reports unresolved Astro/adapter security advisories on this Node-20 line. The available patched major line requires Node 22, so the approved Node-20 constraint and a clean production security gate cannot both be satisfied with Astro.

Fresh audit result after installing the exact lockfile: **7 production-tree findings (3 high, 3 moderate, 1 low, 0 critical)**. The affected tree includes direct Astro/adapter findings plus adapter-transitive workerd tooling. This failed audit is decision evidence, not a waived release risk.

The ADR outcome is therefore `SWITCH_NEXT_VERCEL`. Re-plan and security-check the fallback before implementing shared pages/content; do not carry the Astro route adapter or Cloudflare bindings across, only the runtime-neutral schema, HMAC, Turnstile, notification, and response contracts.
