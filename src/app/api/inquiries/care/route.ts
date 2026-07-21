import { handleInquiry } from "@/lib/forms/handler";
import { methodNotAllowedResponse } from "@/lib/forms/responses";
import type { InquiryEnvironment } from "@/lib/forms/types";

export const runtime = "nodejs";

function environment(): InquiryEnvironment {
  const { TURNSTILE_SECRET, RATE_LIMIT_PEPPER, CARE_DISCORD_WEBHOOK_URL } = process.env;
  return {
    ...(TURNSTILE_SECRET ? { TURNSTILE_SECRET } : {}),
    ...(RATE_LIMIT_PEPPER ? { RATE_LIMIT_PEPPER } : {}),
    ...(CARE_DISCORD_WEBHOOK_URL ? { CARE_DISCORD_WEBHOOK_URL } : {}),
  };
}

export function POST(request: Request): Promise<Response> {
  return handleInquiry("care", request, environment());
}

export function GET(): Response {
  return methodNotAllowedResponse();
}

export const HEAD = GET;
