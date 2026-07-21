import type { InquiryRoute } from "./types";

const encoder = new TextEncoder();
const toHex = (bytes: Uint8Array) => [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");

export async function createRateLimitKey(phone: string, route: InquiryRoute, pepper: string): Promise<string> {
  if (pepper.length < 32 || pepper.startsWith("__REQUIRED_")) throw new Error("rate_limit_pepper_missing");
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(pepper),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(`${route}:${phone}`));
  return `${route}:${toHex(new Uint8Array(signature))}`;
}
