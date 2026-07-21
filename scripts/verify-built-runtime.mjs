import { spawn } from "node:child_process";

const host = "127.0.0.1";
const port = process.env.G007_PORT ?? "3128";
const externalBaseUrl = process.env.G007_BASE_URL;
const baseUrl = externalBaseUrl ?? `http://${host}:${port}`;
const confirmedSuccessText = "문의가 접수되었습니다";
const parsedBaseUrl = new URL(baseUrl);

assertLoopback(parsedBaseUrl);

const publicRoutes = [
  "/",
  "/services",
  "/process",
  "/guides",
  "/guides/long-term-care-application",
  "/guides/assessment-preparation",
  "/guides/starting-home-care",
  "/guides/understanding-personal-costs",
  "/guides/dementia-family-self-care",
  "/guides/gangnam-integrated-care",
  "/about",
  "/contact",
  "/recruitment",
  "/privacy",
  "/robots.txt",
  "/sitemap.xml",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertLoopback(url) {
  assert(["127.0.0.1", "localhost", "::1"].includes(url.hostname), `Refusing to verify a non-loopback URL: ${url.origin}`);
}

async function waitUntilReady() {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl, { redirect: "manual" });
      if (response.status === 200) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Next server did not become ready at ${baseUrl}`);
}

function assertSecurityHeaders(response, label) {
  assert(response.headers.get("x-content-type-options") === "nosniff", `${label}: missing nosniff`);
  assert(response.headers.get("x-frame-options") === "DENY", `${label}: missing frame denial`);
  assert(response.headers.has("content-security-policy"), `${label}: missing CSP`);
  assert(response.headers.has("permissions-policy"), `${label}: missing Permissions-Policy`);
}

function assertInquiryHeaders(response, label) {
  assert(response.headers.get("cache-control") === "no-store", `${label}: response is cacheable`);
  assert(response.headers.get("x-robots-tag") === "noindex", `${label}: response is indexable`);
  const vary = response.headers.get("vary")?.split(",").map((value) => value.trim().toLowerCase()) ?? [];
  assert(vary.includes("accept"), `${label}: missing Vary: Accept`);
}

async function verifyPublicRoutes() {
  for (const route of publicRoutes) {
    const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
    assert(response.status === 200, `GET ${route}: expected 200, received ${response.status}`);
    const expectedType = route === "/robots.txt" ? "text/plain" : route === "/sitemap.xml" ? "application/xml" : "text/html";
    assert(response.headers.get("content-type")?.includes(expectedType), `GET ${route}: unexpected content type`);
    assertSecurityHeaders(response, `GET ${route}`);
    console.info(`PASS GET ${route} -> 200`);
  }

  const missing = await fetch(`${baseUrl}/g007-intentionally-missing`, { redirect: "manual" });
  assert(missing.status === 404, `GET missing route: expected 404, received ${missing.status}`);
  assertSecurityHeaders(missing, "GET missing route");
  console.info("PASS GET missing route -> 404");
}

async function verifyInquiryRoute(kind) {
  const url = `${baseUrl}/api/inquiries/${kind}`;

  for (const method of ["GET", "HEAD"]) {
    const response = await fetch(url, { method, redirect: "manual" });
    const body = method === "HEAD" ? "" : await response.text();
    assert(response.status === 405, `${method} ${kind}: expected 405, received ${response.status}`);
    assert(response.headers.get("allow") === "POST", `${method} ${kind}: missing Allow: POST`);
    assertInquiryHeaders(response, `${method} ${kind}`);
    assert(!body.includes(confirmedSuccessText), `${method} ${kind}: false success text rendered`);
    assert(!body.includes("요청 ID"), `${method} ${kind}: request ID leaked`);
    console.info(`PASS ${method} /api/inquiries/${kind} -> 405 without false success`);
  }

  for (const accept of ["application/json", "text/html"]) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept,
        "content-type": "application/json",
        origin: parsedBaseUrl.origin,
        "sec-fetch-site": "same-origin",
      },
      body: JSON.stringify({ unknown: "field" }),
      redirect: "manual",
    });
    const body = await response.text();
    assert(response.status === 400, `POST ${kind} (${accept}): expected 400, received ${response.status}`);
    assertInquiryHeaders(response, `POST ${kind} (${accept})`);
    assert(!body.includes(confirmedSuccessText), `POST ${kind} (${accept}): false success text rendered`);
    assert(!body.includes("요청 ID") && !body.includes("requestId"), `POST ${kind} (${accept}): request ID leaked`);
    if (accept === "application/json") {
      assert(body === '{"status":"invalid"}', `POST ${kind} (${accept}): unsafe or unexpected JSON body`);
    } else {
      assert(body.includes('<meta name="robots" content="noindex">'), `POST ${kind} (${accept}): HTML is missing noindex`);
      assert(body.includes("전화·카카오톡 문의"), `POST ${kind} (${accept}): HTML is missing recovery guidance`);
    }
    console.info(`PASS POST invalid /api/inquiries/${kind} (${accept}) -> ${response.status}`);
  }
}

let server;
try {
  if (!externalBaseUrl) {
    server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", host, "-p", port], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    server.stdout.on("data", (chunk) => process.stderr.write(chunk));
    server.stderr.on("data", (chunk) => process.stderr.write(chunk));
  }

  await waitUntilReady();
  await verifyPublicRoutes();
  await verifyInquiryRoute("care");
  await verifyInquiryRoute("recruitment");
  console.info(`PASS built Next runtime verification at ${baseUrl}`);
} finally {
  if (server && !server.killed) server.kill("SIGTERM");
}
