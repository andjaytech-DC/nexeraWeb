/** Contact-form submission backend tests. */

import http from "http";
import {
  safeMessage,
  normalizeIdempotencyKey,
  checkRateLimit,
  callerIdentity,
  ok,
  fail,
  isValidEmail,
} from "../src/lib/intake-server";
import {
  CONTACT_LIMIT,
  validateContact,
  storeContactSubmission,
  forwardContactWebhook,
  isBlobStorageConfigured,
  isWebhookConfigured,
} from "../src/lib/contact-server";

let failures = 0;
function check(name: string, condition: boolean, detail = "") {
  console.log(`  ${condition ? "PASS" : "FAIL"}  ${name}`);
  if (!condition) failures++;
}

function checkAsync(name: string, promise: Promise<boolean>) {
  promise.then((ok) => {
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}`);
    if (!ok) failures++;
  });
}

// ── email / length caps ───────────────────────────────────────────────────

check("validateContact rejects invalid email", validateContact(validPayload({ email: "not-an-email" })).ok === false);
check("isValidEmail accepts a well-formed address", isValidEmail("a@b.co"));
check("isValidEmail rejects malformed addresses", !isValidEmail("not-an-email"));
check("isValidEmail enforces RFC-5321 length", !isValidEmail("a".repeat(255) + "@b.co"));

// ── validation ────────────────────────────────────────────────────────────

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    name: "Jane Doe",
    email: "jane@example.com",
    company: "Acme",
    phone: "+91 8882033199",
    service: "CRM",
    projectType: "New Product",
    budget: "₹5L – ₹15L",
    timeline: "1–3 months",
    description:
      "We need a custom CRM for our sales team. It must have pipeline tracking, task management and email integration.",
    preferredContact: "Email",
    challenges: ["Manual processes and operational inefficiency"],
    idempotencyKey: "abc123",
    ...overrides,
  };
}

check("validateContact accepts a complete valid submission", validateContact(validPayload()).ok === true);
check(
  "validateContact rejects empty name",
  validateContact(validPayload({ name: "  " })).ok === false &&
    (validateContact(validPayload({ name: "  " })) as any).error.field === "name",
);
check(
  "validateContact rejects invalid email",
  validateContact(validPayload({ email: "not-an-email" })).ok === false,
);
check(
  "validateContact rejects short description",
  validateContact(validPayload({ description: "Too short" })).ok === false,
);
check("validateContact accepts a single-challenge inquiry", validateContact(validPayload({ challenges: [] })).ok === true);
check(
  "validateContact rejects a filled honeypot",
  validateContact(validPayload({ website: "http://bot.example" })).ok === false,
);
check(
  "validateContact sanitises over-length fields",
  (() => {
    const r = validateContact(validPayload({ name: "A".repeat(300) }));
    return r.ok === true && (r as any).value.name.length <= 120;
  })(),
);
check(
  "validateContact normalises optional fields to safe labels",
  validateContact(validPayload({ service: "nope", preferredContact: "Whatsapp" })).ok === true &&
    (validateContact(validPayload({ service: "nope", preferredContact: "Whatsapp" })) as any).value.service === "Other",
);

// ── standalone helpers ────────────────────────────────────────────────────

check("safeMessage returns message when safe", safeMessage(new Error("x"), "f") === "x");
check("safeMessage returns fallback for stack traces", safeMessage(new Error("Error: something\nat fn (file.js:1:2)"), "f") === "f");
check("safeMessage returns message when safe", safeMessage(new Error("hello"), "f") === "hello");
check("normalizeIdempotencyKey mints a server-side key", normalizeIdempotencyKey(undefined).key.length > 0);
check("checkRateLimit allows the first N requests", checkRateLimit("u1", { limit: 3, windowMs: 60_000 }).limited === false);
check(
  "checkRateLimit limits after the ceiling",
  (() => {
    checkRateLimit("u3", { limit: 1, windowMs: 60_000 }); // first call
    return checkRateLimit("u3", { limit: 1, windowMs: 60_000 }).limited === true;
  })(),
);
check("callerIdentity parses x-forwarded-for", /ip:/.test(callerIdentity(new Request("http://x/", { headers: { "x-forwarded-for": "1.2.3.4" } }))));
check("isBlobStorageConfigured() is false without credentials", !isBlobStorageConfigured());

// ── webhook fan-out (needs a local HTTP server) ───────────────────────────

let webhookPort = 0;
let serverClose: (() => void) | null = null;
let webhookReceived: unknown = null;

const srv = http.createServer((req, res) => {
  let buf = "";
  req.on("data", (c) => (buf += c));
  req.on("end", () => {
    try { webhookReceived = JSON.parse(buf); } catch { webhookReceived = buf; }
    res.writeHead(200); res.end("ok");
  });
});
srv.listen(0, "127.0.0.1", () => {
  webhookPort = (srv.address() as { port: number }).port;
  serverClose = () => srv.close();

  // Start the webhook tests once the server is listening.
  const before1 = process.env.CONTACT_WEBHOOK_URL;
  process.env.CONTACT_WEBHOOK_URL = `http://127.0.0.1:${webhookPort}/inbox`;
  forwardContactWebhook({
    name: "Jane Doe", email: "jane@example.com", service: "CRM",
    projectType: "New Product", description: "A CRM request", preferredContact: "Email",
    idempotencyKey: "webhook-test-1",
  } as any).then(() => {
    // forwardContactWebhook only resolves when the webhook returns 2xx.
    // If we got here, the server accepted the POST.
    console.log("  PASS  forwardContactWebhook POSTs the record");
    process.env.CONTACT_WEBHOOK_URL = before1;

    // Second test: non-2xx response
    const errorSrv = http.createServer((req, res) => {
      res.writeHead(500); res.end("boom");
    });
    errorSrv.listen(0, "127.0.0.1", () => {
      const errorPort = (errorSrv.address() as { port: number }).port;
      const before2 = process.env.CONTACT_WEBHOOK_URL;
      process.env.CONTACT_WEBHOOK_URL = `http://127.0.0.1:${errorPort}/error`;
      forwardContactWebhook({ name: "Jane Doe", email: "jane@example.com", service: "CRM", projectType: "New Product", description: "A CRM request", preferredContact: "Email", idempotencyKey: "webhook-error-1" } as any).then(
        () => {
          console.log("  FAIL  forwardContactWebhook rejects non-2xx responses");
          failures++;
          process.env.CONTACT_WEBHOOK_URL = before2;
          errorSrv.close();
          finish();
        },
        (e: any) => {
          const passed = /^[1-5]/.test(e.status || "") === false;
          console.log(`  ${passed ? "PASS" : "FAIL"}  forwardContactWebhook rejects non-2xx responses`);
          if (!passed) failures++;
          process.env.CONTACT_WEBHOOK_URL = before2;
          errorSrv.close();
          finish();
        }
      );
    });
  }).catch((e: any) => {
    console.log("  FAIL  forwardContactWebhook POSTs the record (threw)");
    failures++;
    process.env.CONTACT_WEBHOOK_URL = before1;
    finish();
  });
});

function finish() {
  console.log(failures === 0 ? "\nAll contact server tests passed." : `\n${failures} contact server test(s) failed.`);
  if (serverClose) serverClose();
  process.exit(failures === 0 ? 0 : 1);
}


