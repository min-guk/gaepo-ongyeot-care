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

  it("draws scene-specific props instead of repeating one illustration everywhere", () => {
    const guide = renderToStaticMarkup(<OniMascot scene="guide" />);
    const contact = renderToStaticMarkup(<OniMascot scene="contact" />);
    const recruitment = renderToStaticMarkup(<OniMascot scene="recruitment" />);
    expect(guide).toContain('data-scene="guide"');
    expect(guide).toContain('class="oni-rear-wing"');
    expect(contact).toContain('data-scene="contact"');
    expect(contact).toContain('class="oni-notepad"');
    expect(recruitment).toContain('data-scene="recruitment"');
    expect(recruitment).toContain('class="oni-clipboard"');
  });

  it("changes the bird silhouette and body pose for every storytelling scene", () => {
    const scenes = ["welcome", "guide", "services", "process", "contact", "recruitment", "privacy", "story", "rest", "search"] as const;
    const rendered = scenes.map((scene) => renderToStaticMarkup(<OniMascot scene={scene} />));
    const poses = rendered.map((html) => html.match(/data-pose="([^"]+)"/u)?.[1]);
    expect(new Set(poses).size).toBe(scenes.length);
    expect(rendered[1]).toContain('class="oni-rear-wing"');
    expect(rendered[1]).toContain('class="oni-flight-trails"');
    expect(rendered[3]).toContain('class="oni-walking-feet"');
    expect(rendered[4]).toContain('class="oni-writing-wing"');
    expect(rendered[4]).not.toContain('class="oni-pencil"');
    expect(rendered[6]).toContain('class="oni-guard-wings"');
    expect(rendered[6]).toContain('class="oni-held-shield"');
    expect(rendered[8]).toContain('class="oni-sleeping-feet"');
    expect(rendered[9]).toContain('class="oni-held-magnifier"');
  });
});
