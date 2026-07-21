const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export type TurnstileResult = "valid" | "invalid" | "unavailable";

export async function verifyTurnstile(
  token: string,
  secret: string,
  fetchFn: typeof fetch = fetch,
): Promise<TurnstileResult> {
  if (!token || !secret || secret.startsWith("__REQUIRED_")) return "invalid";
  try {
    const response = await fetchFn(verifyUrl, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(3_000),
    });
    if (!response.ok) return "unavailable";
    const result = (await response.json()) as { success?: unknown };
    return result.success === true ? "valid" : "invalid";
  } catch {
    return "unavailable";
  }
}
