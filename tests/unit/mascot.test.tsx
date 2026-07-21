import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { OniMascot } from "../../src/components/brand/oni-mascot";

describe("온이 mascot", () => {
  it("provides a named informative SVG without external content", () => {
    const html = renderToStaticMarkup(<OniMascot />);
    expect(html).toContain('<svg role="img" aria-label="');
    expect(html).toContain("<title>온이 — 개포 온곁의 이웃 새</title>");
    expect(html).not.toMatch(/<(?:image|script)\b/iu);
    expect(html).not.toMatch(/(?:href|src)=/iu);
  });

  it("removes the accessible name when it is decorative", () => {
    const html = renderToStaticMarkup(<OniMascot decorative />);
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain("<title>");
    expect(html).not.toContain('role="img"');
  });
});
