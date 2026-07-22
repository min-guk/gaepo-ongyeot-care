# 개포 온곁 재가복지센터

개포동·강남구 가족 돌봄 상담을 위한 공개 웹사이트입니다. Node 20 기반 Next.js App Router와 Cloudflare OpenNext 어댑터를 사용합니다.

## 로컬 검증

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

`npm run preview`는 Cloudflare Workers와 같은 `workerd` 런타임에서 사이트를 실행합니다.

## Cloudflare Workers 배포

Cloudflare 대시보드에서 GitHub 저장소 `min-guk/gaepo-ongyeot-care`를 연결하고 다음 값을 사용합니다.

- Production branch: `main`
- Build command: 비워 둠
- Deploy command: `npm run deploy`
- Root directory: 비워 둠

CLI 인증이 가능한 환경에서는 `npm run deploy`로 동일하게 배포할 수 있습니다. 설정은 `wrangler.jsonc`와 `open-next.config.ts`에 있습니다.

기본 배포는 공개 미리보기 상태입니다. 검증되지 않은 센터 정보, 연락처, 개인정보 처리 검토 및 외부 연동 값이 남아 있으면 검색 노출과 문의 폼이 자동으로 비활성화됩니다. 실제 운영 전에는 `src/data/site-facts.json`의 모든 사실, 개인정보 검토, Turnstile, Discord, Upstash 설정을 확인하고 `npm run facts:validate:production`을 통과해야 합니다.

초기 G001의 Astro/Cloudflare 비교 기록은 `docs/architecture-spike.md`에 보존되어 있습니다. 현재 Next.js/OpenNext 배포 경로는 lint, typecheck, 116개 테스트, 보안 감사, OpenNext 빌드, Wrangler dry-run 및 로컬 `workerd` 경로 검증을 통과했습니다.
