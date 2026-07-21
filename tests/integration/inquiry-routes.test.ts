import { describe, expect, it } from "vitest";
import * as careRoute from "../../src/app/api/inquiries/care/route";
import * as recruitmentRoute from "../../src/app/api/inquiries/recruitment/route";

describe.each([
  ["care", careRoute],
  ["recruitment", recruitmentRoute],
] as const)("%s inquiry route", (_name, route) => {
  it.each(["GET", "HEAD"] as const)("returns a no-store 405 for %s with no false success", async (method) => {
    const response = route[method]();
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
    expect(response.headers.get("vary")).toBe("Accept");
    expect(await response.text()).not.toContain("문의가 접수되었습니다");
  });
});
