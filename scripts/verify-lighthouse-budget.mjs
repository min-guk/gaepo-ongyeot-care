import { readFile } from "node:fs/promises";

const reportPath = process.argv[2] ?? "docs/evidence/g007/lighthouse-summary.json";
const report = JSON.parse(await readFile(reportPath, "utf8"));
const requiredViewports = ["360x800", "768x1024", "1280x800", "1440x900"];
const maximumInitialScriptTransferBytes = 165_000;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const viewport of requiredViewports) {
  const result = report.viewports?.[viewport];
  assert(result, `Missing Lighthouse result for ${viewport}`);
  assert(result.scores.accessibility >= 95, `${viewport}: accessibility ${result.scores.accessibility} < 95`);
  assert(result.scores["best-practices"] >= 95, `${viewport}: best practices ${result.scores["best-practices"]} < 95`);
  assert(result.metrics.cls <= 0.1, `${viewport}: CLS ${result.metrics.cls} > 0.1`);
  assert(result.initialScriptTransferBytes <= maximumInitialScriptTransferBytes, `${viewport}: initial script transfer ${result.initialScriptTransferBytes} > ${maximumInitialScriptTransferBytes}`);
}

assert(report.viewports["360x800"].scores.performance >= 90, `360x800: performance ${report.viewports["360x800"].scores.performance} < 90`);
console.info(`PASS Lighthouse budget (${requiredViewports.length} viewports, mobile performance >=90, accessibility/best-practices >=95, CLS <=0.1, initial JS <=${maximumInitialScriptTransferBytes} bytes)`);
