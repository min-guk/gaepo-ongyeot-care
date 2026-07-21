import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const rootPath = fileURLToPath(root);
const forbiddenPackages = [
  "next-auth",
  "@auth/core",
  "@clerk/nextjs",
  "@supabase/supabase-js",
  "firebase",
  "prisma",
  "@prisma/client",
  "drizzle-orm",
  "mongoose",
  "strapi",
  "contentful",
  "sanity",
];
const forbiddenRouteSegments = new Set(["account", "admin", "auth", "cms", "dashboard", "login", "portal", "signup"]);
const secretPatterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u],
  ["Discord webhook", /https:\/\/(?:canary\.|ptb\.)?discord(?:app)?\.com\/api\/webhooks\/\d{15,}\/[A-Za-z0-9._-]{30,}/u],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9]{20,}\b/u],
  ["OpenAI key", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/u],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/u],
];
const serverOnlyNames = ["TURNSTILE_SECRET", "RATE_LIMIT_PEPPER", "CARE_DISCORD_WEBHOOK_URL", "RECRUITMENT_DISCORD_WEBHOOK_URL", "UPSTASH_REDIS_REST_TOKEN"];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function gitFiles(patterns = []) {
  const result = spawnSync("git", ["ls-files", "-z", ...patterns], { cwd: rootPath, encoding: "utf8" });
  assert(result.status === 0, result.stderr || "git ls-files failed");
  return result.stdout.split("\0").filter(Boolean);
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const packageJson = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
const installedNames = new Set([
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.devDependencies ?? {}),
]);
for (const name of forbiddenPackages) assert(!installedNames.has(name), `Forbidden auth/CMS/database dependency: ${name}`);
console.info("PASS no auth/CMS/database application dependencies");

const appFiles = gitFiles(["src/app"]);
for (const file of appFiles) {
  const segments = file.split("/");
  for (const segment of segments) assert(!forbiddenRouteSegments.has(segment), `Forbidden public route segment '${segment}' in ${file}`);
}
console.info("PASS no account/auth/admin/CMS route surface");

const trackedEnvFiles = gitFiles([".env*"]);
assert(trackedEnvFiles.every((file) => file === ".env.example"), `Unexpected tracked environment file: ${trackedEnvFiles.join(", ")}`);
console.info("PASS only .env.example is tracked");

for (const file of gitFiles()) {
  const path = join(rootPath, file);
  const buffer = await readFile(path);
  if (buffer.includes(0)) continue;
  const content = buffer.toString("utf8");
  for (const [label, pattern] of secretPatterns) assert(!pattern.test(content), `${label} pattern found in tracked file ${file}`);
}
console.info("PASS tracked-source secret pattern scan");

const staticRoot = join(rootPath, ".next/static");
let staticFiles;
try {
  staticFiles = await walk(staticRoot);
} catch {
  throw new Error("Missing .next/static; run npm run build before the bundle scan");
}
for (const path of staticFiles) {
  if (![".js", ".json", ".map", ".txt"].includes(extname(path))) continue;
  const content = await readFile(path, "utf8");
  for (const name of serverOnlyNames) assert(!content.includes(name), `Server-only configuration name leaked into ${relative(staticRoot, path).split(sep).join("/")}`);
  for (const [label, pattern] of secretPatterns) assert(!pattern.test(content), `${label} pattern leaked into browser bundle ${path}`);
}
console.info(`PASS browser bundle scan (${staticFiles.length} static files)`);
