import { ButtonLink, Container } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface nx-anim-in">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(49,94,251,0.06),transparent_60%)]"
        aria-hidden
      />

      <Container className="relative py-14 sm:py-18 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-[620px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-soft px-3.5 py-1.5 text-[11px] font-[700] uppercase tracking-[0.14em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              BUSINESS TECHNOLOGY &amp; DIGITAL TRANSFORMATION
            </p>

            <h1 className="mt-6 font-[var(--font-display)] text-[clamp(2.75rem,5.5vw,5rem)] font-[800] leading-[1.05] tracking-[-0.04em] text-ink">
              Build Better.
              <br />
              Operate Smarter.
              <br />
              <span className="inline-block text-gradient">Grow Faster.</span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-ink-secondary">
              Technology and business solutions designed to simplify operations,
              connect systems, and help your business move forward.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/solution-finder" variant="primary" size="lg">
                Find Your Solution <span aria-hidden>→</span>
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="lg">
                Explore Our Services
              </ButtonLink>
            </div>

            <p className="mt-8 text-[12px] font-[600] uppercase tracking-[0.16em] text-ink-muted">
              Business Applications &middot; Enterprise Systems &middot; AI &amp; Automation &middot;
              Digital Products
            </p>
          </div>

          {/* Constellation column — desktop only */}
          <div className="hidden lg:block" aria-hidden="true" role="presentation">
            <div className="relative h-[400px] w-full flex items-center justify-center">
              <div className="relative w-[360px] h-[360px]">
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-1/2 w-[1px] h-[150px] bg-brand/15 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 right-1/2 w-[1px] h-[150px] bg-brand/15 translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 w-[150px] h-[1px] bg-brand/15 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 w-[150px] h-[1px] bg-brand/15 -translate-x-1/2 translate-y-1/2" />
                  <div className="absolute top-[calc(50%-80px)] left-[calc(50%-80px)] w-[1px] h-[160px] bg-brand/15 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                  <div className="absolute top-[calc(50%-80px)] right-[calc(50%-80px)] w-[1px] h-[160px] bg-brand/15 translate-x-1/2 -translate-y-1/2 -rotate-45" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="flex items-center gap-2 bg-white border border-line rounded-xl px-4 py-2.5 shadow-sm">
                    <span className="text-[14px] font-[700] text-ink">Business Growth</span>
                  </div>
                </div>
                <div className="absolute top-[calc(50%-170px)] left-1/2 -translate-x-1/2">
                  <div className="constellation-node flex items-center gap-2 bg-white border border-line rounded-xl px-3 py-2 shadow-sm transition duration-200">
                    <span className="text-[13px] font-[600] text-ink">CRM</span>
                  </div>
                </div>
                <div className="absolute top-[calc(50%-110px)] right-[calc(50%-110px)]">
                  <div className="constellation-node flex items-center gap-2 bg-white border border-line rounded-xl px-3 py-2 shadow-sm transition duration-200">
                    <span className="text-[13px] font-[600] text-ink">ERP</span>
                  </div>
                </div>
                <div className="absolute bottom-[calc(50%-110px)] right-[calc(50%-110px)]">
                  <div className="constellation-node flex items-center gap-2 bg-white border border-line rounded-xl px-3 py-2 shadow-sm transition duration-200">
                    <span className="text-[13px] font-[600] text-ink">AI &amp; Automation</span>
                  </div>
                </div>
                <div className="absolute bottom-[calc(50%-110px)] left-[calc(50%-110px)]">
                  <div className="constellation-node flex items-center gap-2 bg-white border border-line rounded-xl px-3 py-2 shadow-sm transition duration-200">
                    <span className="text-[13px] font-[600] text-ink">Cloud</span>
                  </div>
                </div>
                <div className="absolute top-[calc(50%-110px)] left-[calc(50%-110px)]">
                  <div className="constellation-node flex items-center gap-2 bg-white border border-line rounded-xl px-3 py-2 shadow-sm transition duration-200">
                    <span className="text-[13px] font-[600] text-ink">Digital Products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Mobile constellation — simplified */}
          <div className="lg:hidden mt-8" aria-hidden="true" role="presentation">
            <div className="relative h-[260px] w-full flex items-center justify-center">
              <div className="relative w-[260px] h-[260px]">
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-1/2 w-[1px] h-[110px] bg-brand/15 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 right-1/2 w-[1px] h-[110px] bg-brand/15 translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 w-[110px] h-[1px] bg-brand/15 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 w-[110px] h-[1px] bg-brand/15 -translate-x-1/2 translate-y-1/2" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="flex items-center gap-2 bg-white border border-line rounded-xl px-4 py-2.5 shadow-sm">
                    <span className="text-[14px] font-[700] text-ink">Business Growth</span>
                  </div>
                </div>
                <div className="absolute top-[calc(50%-130px)] left-1/2 -translate-x-1/2">
                  <div className="constellation-node flex items-center gap-2 bg-white border border-line rounded-xl px-3 py-2 shadow-sm transition duration-200">
                    <span className="text-[13px] font-[600] text-ink">CRM</span>
                  </div>
                </div>
                <div className="absolute bottom-[calc(50%-100px)] right-[calc(50%-100px)]">
                  <div className="constellation-node flex items-center gap-2 bg-white border border-line rounded-xl px-3 py-2 shadow-sm transition duration-200">
                    <span className="text-[13px] font-[600] text-ink">ERP</span>
                  </div>
                </div>
                <div className="absolute bottom-[calc(50%-100px)] left-[calc(50%-100px)]">
                  <div className="constellation-node flex items-center gap-2 bg-white border border-line rounded-xl px-3 py-2 shadow-sm transition duration-200">
                    <span className="text-[13px] font-[600] text-ink">AI &amp; Automation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
