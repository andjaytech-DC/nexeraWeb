import { ButtonLink, Container } from "@/components/ui";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#0A0A0A] nx-anim-in"
      style={{ minHeight: "min(88vh, 760px)" }}
    >
      {/* Grain + radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 80% at 75% 20%, rgba(91,108,255,0.15), transparent)" }}
        aria-hidden
      />

      <Container className="relative flex min-h-[inherit] items-center px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: content */}
          <div className="max-w-[640px] lg:pl-[80px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-[700] uppercase tracking-[0.14em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              BUSINESS TECHNOLOGY &amp; DIGITAL TRANSFORMATION
            </p>

            <h1 className="mt-6 font-[var(--font-display)] text-[clamp(42px,4.5vw,64px)] font-[650] leading-[0.95] tracking-[-0.04em] text-white">
              Build Better.
              <br />
              Operate Smarter.
              <br />
              <span className="inline-block text-gradient">Grow Faster.</span>
            </h1>

            <p className="mt-5 max-w-[48ch] text-[16px] font-[400] leading-[1.6] text-white/60">
              Technology and business solutions designed to simplify operations,
              connect systems, and help your business move forward.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="/solution-finder"
                variant="invert"
                size="md"
                className="h-[46px] rounded-full px-7 text-[15px] font-[700] text-black hover:scale-[1.02]"
              >
                Find Your Solution <span aria-hidden>→</span>
              </ButtonLink>
              <ButtonLink
                href="/services"
                variant="secondary"
                size="md"
                className="h-[46px] rounded-full border-white/15 bg-transparent px-7 text-[15px] font-[700] text-white hover:border-white/40 hover:bg-white/10"
              >
                Explore Our Services
              </ButtonLink>
            </div>

            <p className="mt-8 text-[12px] font-[600] uppercase tracking-[0.16em] text-white/50">
              Business Applications &middot; Enterprise Systems &middot; AI &amp; Automation &middot;
              Digital Products
            </p>
          </div>

          {/* Right: constellation visualization — desktop */}
          <div className="hidden lg:flex items-center justify-center" aria-hidden="true" role="presentation">
            <div className="relative h-[440px] w-full max-w-[520px]">
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 w-[1px] h-[170px] bg-white/15 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 right-1/2 w-[1px] h-[170px] bg-white/15 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-[170px] h-[1px] bg-white/15 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-[170px] h-[1px] bg-white/15 -translate-x-1/2 translate-y-1/2" />
                <div className="absolute top-[calc(50%-95px)] left-[calc(50%-95px)] w-[1px] h-[190px] bg-white/15 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                <div className="absolute top-[calc(50%-95px)] right-[calc(50%-95px)] w-[1px] h-[190px] bg-white/15 translate-x-1/2 -translate-y-1/2 -rotate-45" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur">
                  <span className="text-[14px] font-[700] text-white">Business Growth</span>
                </div>
              </div>
              {[
                { label: "CRM", pos: "top-[calc(50%-190px)] left-1/2 -translate-x-1/2" },
                { label: "ERP", pos: "top-[calc(50%-125px)] right-[calc(50%-125px)]" },
                { label: "AI & Automation", pos: "bottom-[calc(50%-125px)] right-[calc(50%-125px)]" },
                { label: "Cloud", pos: "bottom-[calc(50%-125px)] left-[calc(50%-125px)]" },
                { label: "Digital Products", pos: "top-[calc(50%-125px)] left-[calc(50%-125px)]" },
              ].map((n) => (
                <div key={n.label} className={`absolute ${n.pos}`}>
                  <div className="constellation-node flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur transition duration-200">
                    <span className="text-[13px] font-[600] text-white">{n.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile constellation — faded background */}
        <div
          className="lg:hidden pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 blur-[40px]"
          aria-hidden="true"
        >
          <div className="relative h-[260px] w-[260px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5">
                <span className="text-[14px] font-[700] text-white">Business Growth</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}