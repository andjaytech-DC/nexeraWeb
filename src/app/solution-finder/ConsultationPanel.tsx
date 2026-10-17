"use client";

import { ButtonLink, Button, Card, Eyebrow } from "@/components/ui";

/* ─────────────────────────────────────────────────────────────────────────────
   Solution Finder — step 6: optional consultation hand-off.

   Shows an editable-at-a-glance summary of the user's selections and links to
   the existing contact route with those selections attached. Because the
   contact form has no server-side backend, the copy never claims a request was
   sent.
   ───────────────────────────────────────────────────────────────────────────── */

export interface Summary {
  industry: string;
  goal: string;
  challenges: string;
  direction: string;
}

export function ConsultationPanel({
  summary,
  consultHref,
  onBackToResults,
}: {
  summary: Summary;
  consultHref: string;
  onBackToResults: () => void;
}) {
  return (
    <Card className="nx-print-break">
      <Eyebrow>Step 6 — Consultation</Eyebrow>
      <h2 className="mt-3 font-[var(--font-display)] text-[24px] font-[800] tracking-[-0.02em] text-ink sm:text-[28px]">
        Discuss your recommended solution
      </h2>
      <p className="mt-3 text-[15px] leading-7 text-ink-secondary">
        Optional. Continuing opens our contact form with your industry, challenge and goal prepared,
        so you do not have to repeat yourself.
      </p>

      {summary.direction ? (
        <div className="mt-5 rounded-2xl border border-line bg-surface-alt p-5">
          <p className="text-[12px] font-[800] uppercase tracking-[0.12em] text-ink-muted">
            Your summary
          </p>
          <p className="mt-2 text-[15px] leading-7 text-ink">
            <strong className="font-[700]">Industry:</strong> {summary.industry || "—"}
            <br />
            <strong className="font-[700]">Goal:</strong> {summary.goal || "—"}
            <br />
            <strong className="font-[700]">Challenges:</strong> {summary.challenges || "—"}
            <br />
            <strong className="font-[700]">Suggested direction:</strong> {summary.direction}
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={consultHref} variant="primary" size="lg">
          Continue to contact form <span aria-hidden>→</span>
        </ButtonLink>
        <Button variant="ghost" size="lg" onClick={onBackToResults}>
          Back to recommendations
        </Button>
      </div>

      <p className="mt-4 text-[13px] leading-6 text-ink-muted">
        Our contact form prepares your message with these selections. It does not yet submit to a
        server-side inbox, so please also reach us directly using the contact details on that page.
      </p>
    </Card>
  );
}
