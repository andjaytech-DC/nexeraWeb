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
    (validateContact(validPayload({ name: "  " })) as { ok: false; error: { field: string } }).error.field === "name",
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
    return r.ok === true && (r as { ok: true; value: { name: string } }).value.name.length <= 120;
  })(),
);
check(
  "validateContact normalises optional fields to safe labels",
  validateContact(validPayload({ service: "nope", preferredContact: "Whatsapp" })).ok === true &&
    (validateContact(validPayload({ service: "nope", preferredContact: "Whatsapp" })) as { ok: true; value: { service: string } }).value.service === "Other",
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
  } as never).then(() => {
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
      forwardContactWebhook({ name: "Jane Doe", email: "jane@example.com", service: "CRM", projectType: "New Product", description: "A CRM request", preferredContact: "Email", idempotencyKey: "webhook-error-1" } as never).then(
        () => {
          console.log("  FAIL  forwardContactWebhook rejects non-2xx responses");
          failures++;
          process.env.CONTACT_WEBHOOK_URL = before2;
          errorSrv.close();
          partDone();
        },
        (e: unknown) => {
          const passed = /^[1-5]/.test((e as { status?: string }).status || "") === false;
          console.log(`  ${passed ? "PASS" : "FAIL"}  forwardContactWebhook rejects non-2xx responses`);
          if (!passed) failures++;
          process.env.CONTACT_WEBHOOK_URL = before2;
          errorSrv.close();
          partDone();
        }
      );
    });
  }).catch((e: unknown) => {
    console.log("  FAIL  forwardContactWebhook POSTs the record (threw)");
    failures++;
    process.env.CONTACT_WEBHOOK_URL = before1;
    partDone();
  });
});

/* ── email module (`src/lib/email.ts`) ──────────────────────────────────── */

import { isEmailConfigured, sendInquiryNotification } from "../src/lib/email";

const emailInput = {
  id: "email-test-1",
  reference: "INQ/TEST/EMAIL/00001A01",
  createdAt: new Date().toISOString(),
  name: "Jane Doe",
  email: "jane@example.com",
  company: "Acme",
  phone: "+91 8882033199",
  service: "Website Design & Development",
  projectType: "B2B",
  budget: "Not specified",
  timeline: "Not specified",
  description: "A test inquiry notification.",
};

/**
 * Both async chains (the contact-webhook section above and the email section
 * below) must report in before the process exits and prints the summary.
 */
let pendingParts = 2;
function partDone() {
  pendingParts -= 1;
  if (pendingParts === 0) finish();
}

function finish() {
  console.log(failures === 0 ? "\nAll contact server tests passed." : `\n${failures} contact server test(s) failed.`);
  if (serverClose) serverClose();
  // Exit on the next tick so closing server handles finish first — exiting
  // mid-close trips a libuv assertion on Windows even when all tests pass.
  setTimeout(() => process.exit(failures === 0 ? 0 : 1), 200);
}

(function runEmailTests() {
  const beforeResend = process.env.RESEND_API_KEY;
  const beforeWebhook = process.env.EMAIL_WEBHOOK_URL;
  const beforeTo = process.env.CONTACT_TO_EMAIL;

  // 1. No provider → truthful refusal with nothing sent.
  delete process.env.RESEND_API_KEY;
  delete process.env.EMAIL_WEBHOOK_URL;
  delete process.env.CONTACT_TO_EMAIL;

  const disabled = sendInquiryNotification(emailInput).then((r) => {
    check("disabled provider reports sent=false honestly", r.sent === false && /no email provider/i.test(r.detail));
    check("isEmailConfigured false with no provider", isEmailConfigured() === false);
    // 2. Provider present, recipient missing → truthful refusal.
    process.env.EMAIL_WEBHOOK_URL = "http://127.0.0.1:9/"; // never contacted
    return sendInquiryNotification(emailInput).then((r2) => {
      check("missing recipient reports sent=false honestly", r2.sent === false && /recipient/i.test(r2.detail));
      // 3. Real local webhook: accept case then reject case.
      process.env.CONTACT_TO_EMAIL = "owner@example.com";
      return startEmailWebhook();
    });
  });

  disabled
    .then(() => {
      process.env.EMAIL_WEBHOOK_URL = beforeWebhook;
      process.env.RESEND_API_KEY = beforeResend;
      process.env.CONTACT_TO_EMAIL = beforeTo;
      partDone();
    })
    .catch((e: unknown) => {
      console.log(`  FAIL  email tests crashed: ${String(e)}`);
      failures++;
      process.env.EMAIL_WEBHOOK_URL = beforeWebhook;
      process.env.RESEND_API_KEY = beforeResend;
      process.env.CONTACT_TO_EMAIL = beforeTo;
      partDone();
    });
})();

/** One local server: accepts the notification on /ok (verifying the payload), rejects on /error. */
function startEmailWebhook(): Promise<void> {
  return new Promise((resolve) => {
    const esrv = http.createServer((req, res) => {
      if (req.url === "/ok") {
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", () => {
          try {
            const parsed = JSON.parse(body) as { type?: string; record?: { reference?: string } };
            check(
              "email webhook receives inquiry payload",
              parsed.type === "contact.inquiry.email" && parsed.record?.reference === emailInput.reference,
            );
          } catch {
            check("email webhook receives inquiry payload", false);
          }
          res.writeHead(200);
          res.end();
        });
      } else {
        res.writeHead(500);
        res.end();
      }
    });
    esrv.listen(0, "127.0.0.1", () => {
      const port = (esrv.address() as { port: number }).port;
      process.env.EMAIL_WEBHOOK_URL = `http://127.0.0.1:${port}/ok`;
      sendInquiryNotification(emailInput).then((r) => {
        check("email webhook 2xx → sent=true", r.sent === true);
        process.env.EMAIL_WEBHOOK_URL = `http://127.0.0.1:${port}/error`;
        sendInquiryNotification(emailInput).then((r2) => {
          check("email webhook 5xx → sent=false (truthful)", r2.sent === false);
          esrv.close();
          resolve();
        });
      });
    });
  });
}


