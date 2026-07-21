export type PublicOutcome = "confirmed" | "invalid" | "rate_limited" | "known_failure" | "unknown";
const copy: Record<PublicOutcome, { title: string; message: string }> = {
  confirmed: { title: "문의가 접수되었습니다", message: "담당자가 확인 후 연락드리겠습니다." },
  invalid: { title: "온라인 접수를 완료하지 못했습니다", message: "입력 내용을 확인하거나 전화·카카오톡 문의를 이용해 주세요." },
  rate_limited: { title: "잠시 후 다시 시도해 주세요", message: "반복 요청이 감지되었습니다. 전화·카카오톡 문의도 이용할 수 있습니다." },
  known_failure: { title: "온라인 접수를 완료하지 못했습니다", message: "전화·카카오톡 문의를 이용해 주세요." },
  unknown: { title: "접수 여부를 확인할 수 없습니다", message: "자동으로 다시 전송하지 않았습니다. 전화·카카오톡으로 확인해 주세요." },
};
function escapeHtml(value: string): string {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
  return value.replace(/[&<>'"]/g, (character) => entities[character] ?? "");
}
export function outcomeResponse(request: Request, outcome: PublicOutcome, requestId?: string): Response {
  const wantsJson = request.headers.get("accept")?.toLowerCase().includes("application/json") === true;
  const headers = new Headers({ "cache-control": "no-store", "x-robots-tag": "noindex", vary: "Accept" });
  const status = outcome === "confirmed" ? 200 : outcome === "rate_limited" ? 429 : outcome === "unknown" ? 503 : outcome === "known_failure" ? 502 : 400;
  const safeRequestId = outcome === "confirmed" ? requestId : undefined;
  if (wantsJson) {
    headers.set("content-type", "application/json; charset=utf-8");
    return Response.json({ status: outcome, ...(safeRequestId ? { requestId: safeRequestId } : {}) }, { status, headers });
  }
  headers.set("content-type", "text/html; charset=utf-8");
  const body = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>${escapeHtml(copy[outcome].title)}</title></head><body><main><h1>${escapeHtml(copy[outcome].title)}</h1><p>${escapeHtml(copy[outcome].message)}</p>${safeRequestId ? `<p>요청 ID: <code>${escapeHtml(safeRequestId)}</code></p>` : ""}<p><a href="/contact#alternatives">다른 문의 방법 확인하기</a></p></main></body></html>`;
  return new Response(body, { status, headers });
}
export function methodNotAllowedResponse(): Response {
  return new Response(null, {
    status: 405,
    headers: { allow: "POST", "cache-control": "no-store", "x-robots-tag": "noindex", vary: "Accept" },
  });
}
