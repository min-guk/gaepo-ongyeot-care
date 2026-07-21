import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const playwrightModule = process.env.G007_PLAYWRIGHT_MODULE;
if (!playwrightModule) throw new Error('Set G007_PLAYWRIGHT_MODULE to the transient playwright/index.mjs path');
const { chromium } = await import(pathToFileURL(playwrightModule).href);
const base = process.env.G007_BASE_URL ?? 'http://127.0.0.1:3129';
const parsedBase = new URL(base);
if (!['127.0.0.1', 'localhost', '::1'].includes(parsedBase.hostname)) throw new Error(`Refusing non-loopback browser target: ${parsedBase.origin}`);
const out = process.env.G007_EVIDENCE_DIR ?? new URL('../docs/evidence/g007/', import.meta.url).pathname;
const axeSource = await readFile(new URL('../node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
const routes = ['/', '/services', '/process', '/guides', '/guides/long-term-care-application', '/guides/assessment-preparation', '/guides/starting-home-care', '/guides/understanding-personal-costs', '/guides/dementia-family-self-care', '/guides/gangnam-integrated-care', '/about', '/contact', '/recruitment', '/privacy'];
const viewports = [
  { name: '360x800', width: 360, height: 800 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '1440x900', width: 1440, height: 900 },
];
function assert(ok, message) { if (!ok) throw new Error(message); }
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = { generatedAt: new Date().toISOString(), browser: await browser.version(), base, routes: [], screenshots: [], headerActions: [], media: {}, metadata: {} };
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert(response?.status() === 200, `${viewport.name} ${route}: ${response?.status()}`);
      assert(await page.locator('main').count() === 1, `${viewport.name} ${route}: missing main`);
      assert(await page.locator('h1').count() === 1, `${viewport.name} ${route}: expected one h1`);
      const geometry = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
      assert(geometry.scrollWidth <= geometry.clientWidth + 1, `${viewport.name} ${route}: horizontal overflow ${geometry.scrollWidth}/${geometry.clientWidth}`);
      await page.addScriptTag({ content: axeSource });
      const axe = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
      const blockers = axe.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact));
      assert(blockers.length === 0, `${viewport.name} ${route}: axe blockers ${blockers.map((v) => v.id).join(',')}`);
      report.routes.push({ viewport: viewport.name, route, status: response.status(), overflow: geometry.scrollWidth - geometry.clientWidth, axeViolations: axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), seriousCritical: blockers.length });
    }
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const headerActionsDisplay = await page.locator('header .contact-actions.desktop-actions').evaluate((element) => getComputedStyle(element).display);
    report.headerActions.push({ viewport: viewport.name, display: headerActionsDisplay });
    if (viewport.width === 360) assert(headerActionsDisplay === 'none', `360 header desktop actions display is ${headerActionsDisplay}`);
    if (viewport.width === 1280) assert(headerActionsDisplay === 'flex', `1280 header desktop actions display is ${headerActionsDisplay}`);
    const screenshot = `home-${viewport.name}.png`;
    await page.screenshot({ path: `${out}/${screenshot}`, fullPage: true });
    report.screenshots.push(screenshot);
    await context.close();
  }

  const mobile = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const page = await mobile.newPage();
  await page.goto(base + '/contact', { waitUntil: 'networkidle' });
  const firstInput = page.locator('input[name="name"]').first();
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await page.keyboard.press('Tab');
    if (await firstInput.evaluate((element) => element === document.activeElement)) break;
  }
  assert(await firstInput.evaluate((element) => element === document.activeElement), 'Keyboard did not reach the first input');
  await firstInput.evaluate((element) => element.scrollIntoView({ block: 'center' }));
  const focus = await firstInput.evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const cta = document.querySelector('.mobile-cta')?.getBoundingClientRect();
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, boxShadow: style.boxShadow, inputBottom: rect.bottom, ctaTop: cta?.top ?? innerHeight };
  });
  assert(focus.outlineStyle !== 'none' || focus.boxShadow !== 'none', 'Focused input has no visible focus indicator');
  assert(focus.inputBottom <= focus.ctaTop, `Sticky CTA overlaps focused input (${focus.inputBottom}/${focus.ctaTop})`);
  await page.screenshot({ path: `${out}/contact-360x800.png`, fullPage: true });
  report.screenshots.push('contact-360x800.png');
  await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  report.media = await page.evaluate(() => ({ reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, forcedColors: matchMedia('(forced-colors: active)').matches, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
  assert(report.media.reducedMotion && report.media.forcedColors && report.media.overflow <= 1, 'Media emulation smoke failed');
  await page.screenshot({ path: `${out}/home-360x800-forced-colors.png`, fullPage: true });
  report.screenshots.push('home-360x800-forced-colors.png');
  report.focus = focus;

  await page.emulateMedia({ reducedMotion: 'no-preference', forcedColors: 'none' });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  report.metadata = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    title: document.title,
    robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? null,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
    jsonLdCount: document.querySelectorAll('script[type="application/ld+json"]').length,
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? null,
  }));
  assert(report.metadata.lang === 'ko', 'Document language is not Korean');
  assert(report.metadata.robots?.includes('noindex'), 'Unresolved preview is not noindex');
  assert(report.metadata.canonical === null && report.metadata.jsonLdCount === 0, 'Unverified canonical/JSON-LD leaked');
  const robots = await (await page.request.get(base + '/robots.txt')).text();
  const sitemap = await (await page.request.get(base + '/sitemap.xml')).text();
  assert(robots.includes('Disallow: /'), 'Preview robots.txt does not disallow crawling');
  assert(!sitemap.includes('<url>'), 'Preview sitemap exposes unresolved URLs');
  report.metadata.robotsTxt = robots;
  report.metadata.sitemapUrlCount = (sitemap.match(/<url>/g) ?? []).length;
  await mobile.close();

  await writeFile(`${out}/browser-qa.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(`PASS browser QA: ${report.routes.length} route/viewport checks, 0 serious/critical axe findings, ${report.screenshots.length} screenshots`);
} finally {
  await browser.close();
}
