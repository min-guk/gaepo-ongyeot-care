import { inquiryEnvironment, inquiryRecovery } from "@/lib/forms/environment";
import { handleInquiry } from "@/lib/forms/handler";
import { methodNotAllowedResponse } from "@/lib/forms/responses";

export const runtime = "nodejs";

export function POST(request: Request): Promise<Response> {
  return handleInquiry("recruitment", request, inquiryEnvironment(), { recovery: inquiryRecovery() });
}

export function GET(): Response {
  return methodNotAllowedResponse();
}

export const HEAD = GET;
