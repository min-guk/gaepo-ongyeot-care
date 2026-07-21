import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { inquiryEnvironment } from "../../src/lib/forms/environment";

const careWebhook = "https://discord.com/api/webhooks/123/token";
const recruitmentWebhook = "https://discord.com/api/webhooks/456/token";

describe("route webhook identity", () => {
  it("fails closed when route webhooks differ only by query or hash", () => {
    const configured = inquiryEnvironment(undefined, {
      NODE_ENV: "test",
      CARE_DISCORD_WEBHOOK_URL: `${careWebhook}?wait=true`,
      RECRUITMENT_DISCORD_WEBHOOK_URL: `${careWebhook}#fragment`,
    } as NodeJS.ProcessEnv);
    expect(configured.CARE_DISCORD_WEBHOOK_URL).toBeUndefined();
    expect(configured.RECRUITMENT_DISCORD_WEBHOOK_URL).toBeUndefined();
  });

  it("retains genuinely distinct route webhook paths", () => {
    const configured = inquiryEnvironment(undefined, {
      NODE_ENV: "test",
      CARE_DISCORD_WEBHOOK_URL: `${careWebhook}?wait=true`,
      RECRUITMENT_DISCORD_WEBHOOK_URL: `${recruitmentWebhook}#fragment`,
    } as NodeJS.ProcessEnv);
    expect(configured.CARE_DISCORD_WEBHOOK_URL).toBe(`${careWebhook}?wait=true`);
    expect(configured.RECRUITMENT_DISCORD_WEBHOOK_URL).toBe(`${recruitmentWebhook}#fragment`);
  });

  it("applies the same canonical identity rule in production-fact validation", () => {
    const runValidator = (care: string, recruitment: string) => {
      const result = spawnSync(process.execPath, ["scripts/validate-production-facts.mjs"], {
        cwd: process.cwd(),
        encoding: "utf8",
        env: {
          ...process.env,
          SITE_RELEASE_MODE: "preview",
          VERCEL_ENV: "preview",
          CARE_DISCORD_WEBHOOK_URL: care,
          RECRUITMENT_DISCORD_WEBHOOK_URL: recruitment,
        },
      });
      expect(result.status).toBe(0);
      return `${result.stdout}${result.stderr}`;
    };

    expect(runValidator(`${careWebhook}?wait=true`, `${careWebhook}#fragment`)).toContain(
      "env:route_specific_discord_webhooks",
    );
    expect(runValidator(`${careWebhook}?wait=true`, `${recruitmentWebhook}#fragment`)).not.toContain(
      "env:route_specific_discord_webhooks",
    );
  });
});
