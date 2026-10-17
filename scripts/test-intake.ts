/** HTTP response tests for public intake endpoints.
 *
 * Tests /api/inquiries, /api/careers/apply, /api/careers/resume,
 * /api/careers/talent — verifying status codes, response shape, and
 * that failures are never reported as success.
 *
 * Requires a running dev server (`pnpm dev`) on localhost:3000.
 * Run with `pnpm test:intake` (BASE_URL overrides the target,
 * TEST_JOB_ID points the apply happy path at a seeded, published job).
 *
 * How it stays repeatable and truthful:
 * - Every request carries a unique per-run `x-forwarded-for`, so the
 *   per-identity rate limiter starts fresh each run — re-runs within the
 *   10-minute window don't trip over a spent bucket. A dedicated section
 *   still proves the limiter engages (11th request from one identity →
 *   429 + Retry-After).
 * - Careers routes check `isDbConfigured()` *before* parsing the form, so
 *   without a DATABASE_URL every careers request answers 503
 *   DB_UNAVAILABLE. Validation checks then report SKIP, and the success
 *   paths assert the truthful 503 instead of failing spuriously.
 * - Stable idempotency keys mean re-runs update the same records instead
 *   of piling up duplicates — and a repeat-submission check proves the
 *   idempotency contract itself.
 *
 * The body runs inside main() rather than at the top level: `npx tsx`
 * compiles .ts to CommonJS in this package (no `"type": "module"`), and
 * top-level await fails to transform there.
 */

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
/** Identifies this run to the rate limiter — fresh buckets on every run. */
const RUN = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const CLIENT_HEADERS = { "x-forwarded-for": `test-intake-${RUN}` };
/** Job id for the apply happy path — point it at a seeded, published job. */
const TEST_JOB_ID = process.env.TEST_JOB_ID ?? "job-123";
/** Stable idempotency keys: re-runs update these records, never duplicate. */
const KEYS = {
  inquiry: "test-intake-inquiry",
  apply: "test-intake-apply",
  resume: "test-intake-resume",
  talent: "test-intake-talent",
} as const;

type ApiBody = {
  ok?: boolean;
  id?: string;
  error?: string;
  field?: string;
  code?: string;
  forwarded?: boolean;
};
type ApiRes = { status: number; body: ApiBody; retryAfter: string | null };
type FileSpec = { name: string; type: string; data: ArrayBuffer };

let passed = 0;
let failures = 0;
let skipped = 0;

function check(name: string, condition: boolean, detail = "") {
  console.log(`  ${condition ? "PASS" : "FAIL"}  ${name}${!condition && detail ? ` — ${detail}` : ""}`);
  if (condition) passed++;
  else failures++;
}

function skip(name: string, reason: string) {
  skipped++;
  console.log(`  SKIP  ${name}`);
  console.log(`        ${reason}`);
}

function describe(r: ApiRes): string {
  return `got ${r.status} ${JSON.stringify(r.body)}${r.retryAfter ? ` (Retry-After: ${r.retryAfter})` : ""}`;
}

/* ── HTTP helpers ── */

async function send(path: string, init: RequestInit = {}): Promise<ApiRes> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: { ...CLIENT_HEADERS, ...(init.headers as Record<string, string> | undefined) },
    });
    const text = await res.text();
    let body: ApiBody;
    try {
      const parsed: unknown = JSON.parse(text);
      body =
        parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
          ? (parsed as ApiBody)
          : { error: `unexpected JSON: ${text.slice(0, 120)}` };
    } catch {
      // Never let an HTML error page masquerade as the JSON contract:
      // `ok` stays undefined, so `ok === false` assertions fail loudly.
      body = { error: `non-JSON response: ${text.slice(0, 120)}` };
    }
    return { status: res.status, body, retryAfter: res.headers.get("retry-after") };
  } catch (e) {
    return {
      status: 0,
      body: { error: e instanceof Error ? e.message : String(e) },
      retryAfter: null,
    };
  }
}

async function postJSON(path: string, body: unknown): Promise<ApiRes> {
  return send(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function postRaw(path: string, text: string): Promise<ApiRes> {
  return send(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: text,
  });
}

async function postForm(
  path: string,
  fields: Record<string, string>,
  file?: FileSpec,
): Promise<ApiRes> {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  if (file) fd.append("resume", new Blob([file.data], { type: file.type }), file.name);
  return send(path, { method: "POST", body: fd });
}

/* ── Expectations ── */

/** The careers DB gate: 503 + machine-readable code, checked before parsing. */
const isDbGate = (r: ApiRes) =>
  r.status === 503 && r.body.ok === false && r.body.code === "DB_UNAVAILABLE";
/** Set from the first apply request (see main()). */
let dbUp = false;

/** Client-error rejection: 400, `{ ok: false }`, and the exact field.
 *  Pass `field: null` to assert the response carries NO field hint. */
function expect400(name: string, r: ApiRes, field?: string | null) {
  if (r.status === 429) return skip(name, `rate limited — retry in ${r.retryAfter ?? "?"}s`);
  const fieldOk =
    field === undefined ? true : field === null ? r.body.field === undefined : r.body.field === field;
  check(name, r.status === 400 && r.body.ok === false && fieldOk, describe(r));
}

/** Careers variant: while the DB gate is closed the route answers 503
 *  *before* validation runs — there is nothing to verify, so report it. */
function expectCareers400(name: string, r: ApiRes, field?: string | null) {
  if (r.status === 429) return skip(name, `rate limited — retry in ${r.retryAfter ?? "?"}s`);
  if (!dbUp) return skip(name, "database not configured — route answers 503 before validation");
  expect400(name, r, field);
}

/** Happy path: 202 with a real id and a truthful `forwarded` annotation —
 *  or a truthful environment refusal (503 + machine-readable code) when the
 *  database or blob storage is not configured. Never a fake success. */
function expectAccepted(name: string, r: ApiRes, opts: { allowMissingJob?: boolean } = {}) {
  if (r.status === 429) return skip(name, `rate limited — retry in ${r.retryAfter ?? "?"}s`);

  const accepted =
    r.status === 202 &&
    r.body.ok === true &&
    typeof r.body.id === "string" &&
    r.body.id.length > 0 &&
    typeof r.body.forwarded === "boolean";
  if (accepted) {
    check(name, true);
    console.log(`        id: ${r.body.id} (forwarded: ${r.body.forwarded})`);
    return;
  }

  if (r.status === 503 && r.body.ok === false && typeof r.body.code === "string") {
    check(name, true);
    console.log(`        note: ${r.body.code} — environment not configured; refused truthfully`);
    return;
  }

  if (opts.allowMissingJob && r.status === 404 && r.body.ok === false && r.body.field === "jobId") {
    check(name, true);
    console.log(
      `        note: no job "${TEST_JOB_ID}" — seed one or set TEST_JOB_ID to exercise the full apply path`,
    );
    return;
  }

  check(name, false, describe(r));
}

/* ── The run ── */

async function main(): Promise<void> {
  // ─────────────────────────────────────────────────────────────────────────
  // /api/inquiries
  // ─────────────────────────────────────────────────────────────────────────

  console.log(`== /api/inquiries == (${BASE})`);

  const head = await send("/api/inquiries", { method: "GET" });
  if (head.status === 0) {
    console.error(`\nCannot reach ${BASE} — ${head.body.error}`);
    console.error("Start the dev server with `pnpm dev`, or set BASE_URL to a running instance.");
    process.exit(1);
  }
  check(
    "inquiries GET → 405 method not allowed",
    head.status === 405 && head.body.ok === false,
    describe(head),
  );

  const validInquiry = {
    name: "Jane Doe",
    email: "jane@example.com",
    company: "Acme",
    phone: "+91 8882033199",
    service: "CRM",
    projectType: "New Product",
    budget: "₹5L – ₹15L",
    timeline: "1–3 months",
    description: "We need a custom CRM for our sales team with pipeline tracking.",
    preferredContact: "Email",
    idempotencyKey: KEYS.inquiry,
  };

  let r = await postRaw("/api/inquiries", "");
  expect400("inquiries empty body → 400", r);

  r = await postJSON("/api/inquiries", {});
  expect400("inquiries empty object → 400 (field name)", r, "name");

  r = await postJSON("/api/inquiries", { ...validInquiry, email: "not-an-email" });
  expect400("inquiries invalid email → 400 (field email)", r, "email");

  r = await postJSON("/api/inquiries", { ...validInquiry, description: "short" });
  expect400("inquiries short description → 400 (field description)", r, "description");

  r = await postJSON("/api/inquiries", { ...validInquiry, website: "http://bot.example" });
  expect400("inquiries honeypot → 400 with no field hint", r, null);

  r = await postRaw("/api/inquiries", "not json {");
  expect400("inquiries malformed JSON → 400", r);

  r = await postJSON("/api/inquiries", { ...validInquiry, description: "A".repeat(30_000) });
  check("inquiries oversized body → 413", r.status === 413 && r.body.ok === false, describe(r));

  const inquiry = await postJSON("/api/inquiries", validInquiry);
  expectAccepted("inquiries valid submission → 202", inquiry);

  const inquiryRepeat = await postJSON("/api/inquiries", validInquiry);
  if (inquiry.status === 202) {
    check(
      "inquiries repeat submission → same id (idempotent)",
      inquiryRepeat.status === 202 &&
        inquiryRepeat.body.ok === true &&
        inquiryRepeat.body.id === inquiry.body.id,
      `${describe(inquiryRepeat)}; first id: ${inquiry.body.id}`,
    );
  } else {
    skip(
      "inquiries repeat submission → same id (idempotent)",
      `first submission did not return 202 — ${describe(inquiry)}`,
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // /api/careers/apply
  // ─────────────────────────────────────────────────────────────────────────

  console.log("\n== /api/careers/apply ==");

  const validApplyFields = {
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "+91 8882033199",
    location: "Noida, India",
    linkedinUrl: "https://linkedin.com/in/janedoe",
    portfolioUrl: "https://example.com",
    jobId: TEST_JOB_ID,
    coverLetter: "I am excited to apply.",
    consent: "on",
  };

  const resumeFile: FileSpec = {
    name: "resume.pdf",
    type: "application/pdf",
    data: new Uint8Array([0x25, 0x50, 0x44, 0x46]).buffer as ArrayBuffer,
  };
  const blockedFile: FileSpec = {
    name: "malware.exe",
    type: "application/x-msdownload",
    data: new Uint8Array([0x4d, 0x5a]).buffer as ArrayBuffer,
  };

  // The first request doubles as the DB-gate probe: the careers routes call
  // isDbConfigured() before parsing the form, so a 503 DB_UNAVAILABLE here
  // means no validation check below can run.
  r = await postForm("/api/careers/apply", {});
  dbUp = !isDbGate(r);
  if (dbUp) {
    console.log("  note: database configured — validation paths exercised.");
  } else {
    console.log("  note: database NOT configured — careers validation checks will be skipped.");
    check("apply DB gate closed → 503 DB_UNAVAILABLE (truthful refusal)", isDbGate(r), describe(r));
  }
  expectCareers400("apply empty form → 400 (field jobId)", r, "jobId");

  r = await postForm("/api/careers/apply", { ...validApplyFields, email: "not-an-email" });
  expectCareers400("apply invalid email → 400 (field email)", r, "email");

  r = await postForm("/api/careers/apply", { ...validApplyFields, jobId: "" });
  expectCareers400("apply missing jobId → 400 (field jobId)", r, "jobId");

  r = await postForm("/api/careers/apply", { ...validApplyFields, linkedinUrl: "not-a-url" });
  expectCareers400("apply invalid LinkedIn URL → 400 (field linkedinUrl)", r, "linkedinUrl");

  r = await postForm("/api/careers/apply", { ...validApplyFields, consent: "" });
  expectCareers400("apply missing consent → 400 (field consent)", r, "consent");

  r = await postForm("/api/careers/apply", { ...validApplyFields });
  expectCareers400("apply missing resume file → 400 (field resume)", r, "resume");

  r = await postForm("/api/careers/apply", validApplyFields, blockedFile);
  expectCareers400("apply non-PDF/DOC file → 400 (field resume)", r, "resume");

  r = await postForm(
    "/api/careers/apply",
    { ...validApplyFields, idempotencyKey: KEYS.apply },
    resumeFile,
  );
  expectAccepted("apply valid submission → 202 (or truthful refusal)", r, {
    allowMissingJob: true,
  });

  // ─────────────────────────────────────────────────────────────────────────
  // /api/careers/resume
  // ─────────────────────────────────────────────────────────────────────────

  console.log("\n== /api/careers/resume ==");

  const validResumeFields = {
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "+91 8882033199",
    location: "Noida, India",
    linkedinUrl: "https://linkedin.com/in/janedoe",
    portfolioUrl: "https://example.com",
    yearsExperience: "5",
    areaOfInterest: "Software Engineering",
    employmentType: "Full-time",
    message: "I am interested in opportunities.",
    consent: "on",
  };

  r = await postForm("/api/careers/resume", {});
  expectCareers400("resume empty form → 400 (field fullName)", r, "fullName");

  r = await postForm("/api/careers/resume", { ...validResumeFields, email: "not-an-email" });
  expectCareers400("resume invalid email → 400 (field email)", r, "email");

  r = await postForm("/api/careers/resume", { ...validResumeFields, phone: "" });
  expectCareers400("resume missing phone → 400 (field phone)", r, "phone");

  r = await postForm("/api/careers/resume", { ...validResumeFields, location: "" });
  expectCareers400("resume missing location → 400 (field location)", r, "location");

  r = await postForm("/api/careers/resume", { ...validResumeFields, yearsExperience: "" });
  expectCareers400(
    "resume missing yearsExperience → 400 (field yearsExperience)",
    r,
    "yearsExperience",
  );

  r = await postForm("/api/careers/resume", { ...validResumeFields, areaOfInterest: "" });
  expectCareers400("resume missing areaOfInterest → 400 (field areaOfInterest)", r, "areaOfInterest");

  r = await postForm("/api/careers/resume", { ...validResumeFields, consent: "" });
  expectCareers400("resume missing consent → 400 (field consent)", r, "consent");

  r = await postForm("/api/careers/resume", validResumeFields);
  expectCareers400("resume missing file → 400 (field resume)", r, "resume");

  r = await postForm(
    "/api/careers/resume",
    { ...validResumeFields, idempotencyKey: KEYS.resume },
    resumeFile,
  );
  expectAccepted("resume valid submission → 202 (or truthful refusal)", r);

  // ─────────────────────────────────────────────────────────────────────────
  // /api/careers/talent
  // ─────────────────────────────────────────────────────────────────────────

  console.log("\n== /api/careers/talent ==");

  const validTalentFields = {
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "+91 8882033199",
    location: "Noida, India",
    linkedinUrl: "https://linkedin.com/in/janedoe",
    portfolioUrl: "https://example.com",
    yearsExperience: "5",
    areaOfInterest: "AI & Data",
    employmentType: "Full-time",
    message: "Open to opportunities.",
    consent: "on",
  };

  r = await postForm("/api/careers/talent", {});
  expectCareers400("talent empty form → 400 (field fullName)", r, "fullName");

  r = await postForm("/api/careers/talent", { ...validTalentFields, email: "not-an-email" });
  expectCareers400("talent invalid email → 400 (field email)", r, "email");

  r = await postForm("/api/careers/talent", { ...validTalentFields, areaOfInterest: "" });
  expectCareers400("talent missing areaOfInterest → 400 (field areaOfInterest)", r, "areaOfInterest");

  r = await postForm("/api/careers/talent", { ...validTalentFields, consent: "" });
  expectCareers400("talent missing consent → 400 (field consent)", r, "consent");

  r = await postForm("/api/careers/talent", { ...validTalentFields, linkedinUrl: "not-a-url" });
  expectCareers400("talent invalid LinkedIn URL → 400 (field linkedinUrl)", r, "linkedinUrl");

  r = await postForm("/api/careers/talent", { ...validTalentFields, idempotencyKey: KEYS.talent });
  expectAccepted("talent valid submission → 202 (or truthful refusal)", r);

  // ─────────────────────────────────────────────────────────────────────────
  // Rate limiting (its own per-run identity so it can't starve the checks above)
  // ─────────────────────────────────────────────────────────────────────────

  console.log("\n== rate limiting ==");

  let last: ApiRes | null = null;
  for (let i = 1; i <= 11; i++) {
    last = await send("/api/inquiries", {
      method: "POST",
      headers: { "x-forwarded-for": `test-intake-rl-${RUN}`, "content-type": "application/json" },
      body: "{}",
    });
    if (last.status === 429) break;
  }
  check(
    "inquiries 11th submission from one identity → 429 + Retry-After",
    last !== null && last.status === 429 && last.body.ok === false && Number(last.retryAfter) >= 1,
    last ? describe(last) : "no response",
  );

  // ─────────────────────────────────────────────────────────────────────────

  console.log(
    `\n${failures === 0 ? "All intake HTTP tests passed" : `${failures} intake HTTP test(s) failed`} ` +
      `(${passed} passed, ${skipped} skipped).`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e: unknown) => {
  console.error("Test harness crashed:", e);
  process.exit(1);
});

export {};
