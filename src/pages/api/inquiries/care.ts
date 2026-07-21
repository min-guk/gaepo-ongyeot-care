import type { APIRoute } from "astro";
import { handleInquiry } from "../../../lib/forms/handler";
import { methodNotAllowedResponse } from "../../../lib/forms/responses";

export const prerender = false;
export const POST: APIRoute = ({ request, locals }) => handleInquiry("care", request, locals.runtime.env);
export const GET: APIRoute = () => methodNotAllowedResponse();
export const HEAD: APIRoute = () => methodNotAllowedResponse();
