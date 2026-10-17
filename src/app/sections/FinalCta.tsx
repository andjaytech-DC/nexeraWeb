import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { contactInfo } from "@/lib/site-data";

/* ───────────────────────────────────────────────────────────────────────────
   Homepage — closing CTA.

   The page's second navy panel, so it ends on a strong high-contrast note
   without every section being dark.
   ─────────────────────────────────────────────────────────────────────────── */

export function FinalCta() {
  return (
    <Section tone="canvas" size="sm">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_10%,rgba(49,94,251,0.30),transparent_60%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_90%,rgba(8,145,178,0.18),transparent_60%)]"
            aria-hidden
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="text-[11px] font-[800] uppercase tracking-[0.18em] text-brand-line sm:text-xs">
                Start a conversation
              </p>
              <h2 className="mt-3 max-w-[620px] font-[var(--font-display)] text-[27px] font-[800] leading-[1.14] tracking-[-0.025em] text-white sm:text-[36px]">
                Let&apos;s build what your business needs.
              </h2>
              <p className="mt-4 max-w-[560px] text-[16px] leading-7 text-white/75">
                Tell us about your project. We will respond with a clear next step — no aggressive
                sales, just a practical conversation.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href="/contact?type=new-project"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-[800] text-brand transition hover:bg-brand-soft lg:w-auto"
              >
                Start a project <span aria-hidden>→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-[700] text-white transition focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 hover:border-white/50 hover:bg-white/10 lg:w-auto"
              >
                Talk to our team
              </Link>
              <p className="text-center text-xs leading-5 text-white/55 lg:text-right">
                3rd Floor, D23 Building, S3V Business Park, Sector-59, Noida
                <br />
                <a href={contactInfo.phoneHref} className="hover:text-white">
                  {contactInfo.phoneDisplay}
                </a>{" "}
                ·{" "}
                <a href={contactInfo.emailHref} className="hover:text-white">
                  {contactInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
