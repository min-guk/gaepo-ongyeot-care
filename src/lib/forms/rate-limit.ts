import type { RateLimitBinding } from "./types";

const windowSeconds = 60;
const maximumAttempts = 5;
const deadlineMilliseconds = 2_000;
const script = "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; if n<=tonumber(ARGV[2]) then return 1 else return 0 end";

export function createDurableRateLimitAdapter(
  url: string | undefined,
  token: string | undefined,
  fetchFn: typeof fetch = fetch,
): RateLimitBinding | undefined {
  if (!url || !token || url.startsWith("__REQUIRED_") || token.startsWith("__REQUIRED_")) return undefined;
  let endpoint: URL;
  try {
    endpoint = new URL(url);
    if (endpoint.protocol !== "https:") return undefined;
  } catch {
    return undefined;
  }
  return {
    async limit({ key }) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), deadlineMilliseconds);
      try {
        const response = await fetchFn(endpoint, {
          method: "POST",
          headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
          body: JSON.stringify(["EVAL", script, "1", `inquiry:${key}`, String(windowSeconds), String(maximumAttempts)]),
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) return { success: false, unavailable: true };
        const body = (await response.json()) as { result?: unknown };
        return { success: body.result === 1 };
      } catch {
        return { success: false, unavailable: true };
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
