import { pathToFileURL } from "node:url";

export const syntheticFixtures = {
  care: {
    name: "합성돌봄점검", phone: "010-0000-0000", preferredContactTime: "anytime",
    coarseArea: "gaepo", topic: "other-basic",
  },
  recruitment: {
    name: "합성채용점검", phone: "010-0000-0000", preferredContactTime: "anytime",
    coarseArea: "gaepo",
  },
};

export function assertSyntheticTarget(env) {
  if (env.SYNTHETIC_ENVIRONMENT !== "staging") throw new Error("Synthetic environment must be staging.");
  const target = new URL(env.SYNTHETIC_STAGING_BASE_URL ?? "");
  if (target.protocol !== "https:") throw new Error("Synthetic target must use HTTPS.");
  if (!env.SYNTHETIC_ALLOWED_HOST || target.hostname !== env.SYNTHETIC_ALLOWED_HOST) throw new Error("Synthetic target host is not explicitly allowlisted.");
  if (!env.SYNTHETIC_PRODUCTION_HOST || target.hostname === env.SYNTHETIC_PRODUCTION_HOST) throw new Error("Synthetic target must be distinct from production.");
  if (!env.SYNTHETIC_PRIVACY_NOTICE_VERSION || !env.SYNTHETIC_TURNSTILE_TOKEN) throw new Error("Synthetic staging credentials are incomplete.");
  return target;
}

export async function runSynthetic(env = process.env, fetchFn = fetch) {
  const target = assertSyntheticTarget(env);
  if (env.SYNTHETIC_FORCE_FAILURE === "true") throw new Error("Forced synthetic failure drill.");

  for (const [route, fixture] of Object.entries(syntheticFixtures)) {
    const fields = new URLSearchParams({
      ...fixture,
      privacyNoticeVersion: env.SYNTHETIC_PRIVACY_NOTICE_VERSION,
      "cf-turnstile-response": env.SYNTHETIC_TURNSTILE_TOKEN,
      website: "",
    });
    const response = await fetchFn(new URL(`/api/inquiries/${route}`, target), {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
        origin: target.origin,
        "sec-fetch-site": "same-origin",
      },
      body: fields,
      redirect: "error",
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.status !== "confirmed" || typeof result.requestId !== "string") {
      throw new Error(`${route} synthetic was not transitively confirmed by a Discord message ID.`);
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runSynthetic().then(
    () => process.stdout.write("Staging synthetic inquiries confirmed.\n"),
    (error) => { process.stderr.write(`${error instanceof Error ? error.message : "Synthetic failed."}\n`); process.exitCode = 1; },
  );
}
