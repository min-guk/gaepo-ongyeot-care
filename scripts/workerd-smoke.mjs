import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const port = 8788;
const child = spawn(process.execPath, ["node_modules/wrangler/bin/wrangler.js", "dev", "--local", "--ip", "127.0.0.1", "--port", String(port)], {
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
child.stdout.on("data", (chunk) => { output += chunk; });
child.stderr.on("data", (chunk) => { output += chunk; });

try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`wrangler exited early (${child.exitCode})\n${output}`);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/contact`);
      if (response.ok) { ready = true; break; }
    } catch {}
    await sleep(250);
  }
  if (!ready) throw new Error(`workerd did not become ready\n${output}`);

  const contact = await fetch(`http://127.0.0.1:${port}/contact`);
  const contactHtml = await contact.text();
  if (contact.status !== 200 || !contactHtml.includes('action="/api/inquiries/care"')) throw new Error("prerendered contact form failed");

  for (const method of ["GET", "HEAD"]) {
    const response = await fetch(`http://127.0.0.1:${port}/api/inquiries/care`, { method });
    const body = method === "HEAD" ? "" : await response.text();
    if (response.status !== 405 || response.headers.get("allow") !== "POST" || body.includes("접수되었습니다")) {
      throw new Error(`${method} false-success guard failed`);
    }
  }

  const form = new URLSearchParams({
    name: "김온이", phone: "010-1234-5678", preferredContactTime: "afternoon",
    coarseArea: "gaepo", topic: "visit-care", privacyConsent: "accepted", "cf-turnstile-response": "", website: "",
  });
  const native = await fetch(`http://127.0.0.1:${port}/api/inquiries/care`, {
    method: "POST",
    headers: { origin: `http://127.0.0.1:${port}`, "sec-fetch-site": "same-origin" },
    body: form,
  });
  const nativeHtml = await native.text();
  if (native.status !== 400 || !nativeHtml.includes("전화") || nativeHtml.includes("문의가 접수되었습니다")) {
    throw new Error(`native POST safe-degradation failed: status=${native.status} body=${nativeHtml.slice(0, 500)}\n${output}`);
  }
  console.log("PASS workerd: prerendered /contact, POST-only 405 guards, and safe native POST fallback");
} finally {
  child.kill("SIGTERM");
}
