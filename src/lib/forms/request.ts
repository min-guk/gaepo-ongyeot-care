const maxBodyBytes = 8_192;
const transportKeys = new Set(["cf-turnstile-response", "website"]);
export type ParsedRequest =
  | { ok: true; fields: Record<string, string>; turnstileToken: string; honeypot: string }
  | { ok: false; reason: "invalid_request" };

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (origin !== new URL(request.url).origin) return false;
  return request.headers.get("sec-fetch-site") === "same-origin";
}

function fromEntries(entries: Iterable<[string, unknown]>): ParsedRequest {
  const collected = new Map<string, string>();
  for (const [key, rawValue] of entries) {
    if (collected.has(key) || typeof rawValue !== "string") return { ok: false, reason: "invalid_request" };
    collected.set(key, rawValue);
  }
  const turnstileToken = collected.get("cf-turnstile-response") ?? "";
  const honeypot = collected.get("website") ?? "";
  const fields = Object.fromEntries([...collected].filter(([key]) => !transportKeys.has(key)));
  return { ok: true, fields, turnstileToken, honeypot };
}

export async function parseInquiryRequest(request: Request): Promise<ParsedRequest> {
  if (!isSameOrigin(request)) return { ok: false, reason: "invalid_request" };
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(declaredLength) || declaredLength > maxBodyBytes) return { ok: false, reason: "invalid_request" };
  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/x-www-form-urlencoded" && contentType !== "application/json") {
    return { ok: false, reason: "invalid_request" };
  }
  let raw: string;
  try { raw = await request.text(); } catch { return { ok: false, reason: "invalid_request" }; }
  if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) return { ok: false, reason: "invalid_request" };
  if (contentType === "application/x-www-form-urlencoded") return fromEntries(new URLSearchParams(raw).entries());
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return { ok: false, reason: "invalid_request" };
    return fromEntries(Object.entries(parsed as Record<string, unknown>));
  } catch {
    return { ok: false, reason: "invalid_request" };
  }
}
