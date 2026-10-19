/**
 * Email notification for accepted contact inquiries.
 *
 * Priority: Resend HTTP API (RESEND_API_KEY) → generic webhook relay
 * (EMAIL_WEBHOOK_URL) → disabled. With no provider configured nothing is
 * sent and callers receive a truthful negative — no fake successes.
 *
 * Delivery note: "sent" means the provider accepted the request — it never
 * guarantees the mailbox received it (see docs/deployment.md §6). Owner must
 * verify with a real test email before trusting the channel.
 *
 * Server-only module: keys are read from process.env, never NEXT_PUBLIC_*
 */

const EMAIL_TIMEOUT_MS = 8000;

export interface EmailNotificationInput {
  id: string;
  reference: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY || process.env.EMAIL_WEBHOOK_URL);
}

function emailFrom(): string {
  // onboarding@resend.dev is Resend's test sender — usable without a verified
  // domain, but deliveries are restricted until a real domain is verified.
  return process.env.EMAIL_FROM || "Nexara Website <onboarding@resend.dev>";
}

function emailTo(): string | null {
  return process.env.CONTACT_TO_EMAIL || null;
}

export function renderInquiryEmail(r: EmailNotificationInput): { subject: string; text: string } {
  const subject = `New inquiry ${r.reference} — ${r.service}`;
  const text = [
    `Reference: ${r.reference}`,
    `Submitted: ${r.createdAt}`,
    `Name: ${r.name}`,
    `Email: ${r.email}`,
    `Company: ${r.company || "-"}`,
    `Phone: ${r.phone || "-"}`,
    `Service: ${r.service}`,
    `Project type: ${r.projectType}`,
    `Budget: ${r.budget || "-"}`,
    `Timeline: ${r.timeline || "-"}`,
    "",
    "Description:",
    r.description,
  ].join("\n");
  return { subject, text };
}

async function withTimeout<T>(fn: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), EMAIL_TIMEOUT_MS);
  try {
    return await fn(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Best-effort notification. Resolves to a truthful result; only throws on
 * programming errors — callers must treat any failure as "email skipped",
 * storage has already succeeded by the time this runs.
 */
export async function sendInquiryNotification(
  record: EmailNotificationInput,
): Promise<{ sent: boolean; detail: string }> {
  if (!isEmailConfigured()) {
    return { sent: false, detail: "No email provider configured — nothing was sent." };
  }
  const to = emailTo();
  if (!to) {
    return { sent: false, detail: "No recipient configured (CONTACT_TO_EMAIL) — nothing was sent." };
  }

  const { subject, text } = renderInquiryEmail(record);

  if (process.env.RESEND_API_KEY) {
    return withTimeout(async (signal) => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ from: emailFrom(), to: [to], subject, text }),
        signal,
      });
      if (!res.ok) {
        // Provider errors are not surfaced with payloads to clients.
        return { sent: false, detail: `Resend responded ${res.status} — email not confirmed.` };
      }
      return { sent: true, detail: "Resend accepted the email. Delivery is not yet confirmed." };
    });
  }

  const webhookUrl = process.env.EMAIL_WEBHOOK_URL as string;
  return withTimeout(async (signal) => {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "contact.inquiry.email", record }),
      signal,
    });
    if (!res.ok) {
      return { sent: false, detail: `Email webhook responded ${res.status}.` };
    }
    return { sent: true, detail: "Email webhook accepted the request." };
  });
}
