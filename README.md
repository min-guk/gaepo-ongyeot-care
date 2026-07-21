# 개포 온곁 G001 architecture spike

Node-20-compatible Astro/Cloudflare Workers architecture spike for the secure, POST-only care-inquiry contract.

The executable slice and tests are retained as migration evidence. The architecture decision is **`SWITCH_NEXT_VERCEL`** because the latest Node-20-compatible Astro/Cloudflare line does not pass the production dependency-security gate. See [`docs/architecture-spike.md`](docs/architecture-spike.md).

No external deployment is authorized or performed by this repository.

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:workerd
npm run dry-run
```
