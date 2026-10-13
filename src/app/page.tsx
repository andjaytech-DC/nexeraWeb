import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { solutions, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Nexara Global Solutions — Build Better. Operate Smarter. Grow Faster.",
  description: "Nexara Global Solutions helps businesses turn complex challenges into intelligent digital products, enterprise platforms, AI-powered software and scalable technology solutions.",
};

export default function Home() {
  return (
    <div className="bg-[#070A0F] text-[#E6EAF0] selection:bg-[#4F7EFF]/30">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(79,126,255,0.22),transparent_60%),radial-gradient(ellipse_60%_40%_at_90%_20%,rgba(34,211,238,0.12),transparent_60%)]" />
          <div className="absolute inset-0 grid-pattern opacity-[0.5]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#4F7EFF]/[0.06] blur-[80px] rounded-full" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-20 pb-10 lg:pb-16">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] tracking-[0.14em] font-[600] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F7EFF] animate-pulse" /> TECHNOLOGY & DIGITAL TRANSFORMATION PARTNER
              </div>
              <h1 className="mt-6 font-[var(--font-jakarta)] font-[800] tracking-[-0.04em] leading-[0.9] text-[38px] sm:text-[52px] lg:text-[64px]">
                <span className="block text-white">Build Better.</span>
                <span className="block text-white">Operate Smarter.</span>
                <span className="block bg-gradient-to-r from-[#4F7EFF] to-[#22D3EE] bg-clip-text text-transparent">Grow Faster.</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[15px] sm:text-[16px] leading-7 text-white/60">
                Nexara Global Solutions helps businesses turn complex challenges into intelligent digital products, enterprise platforms, AI-powered software and scalable technology solutions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact?type=new-project" className="inline-flex items-center gap-2 rounded-full bg-[#4F7EFF] px-7 py-[13px] text-[14px] font-[700] text-white hover:bg-[#3E6AF0] transition shadow-[0_8px_32px_rgba(79,126,255,0.35)]">
                  Start a Project <span aria-hidden>→</span>
                </Link>
                <Link href="/solutions" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-[13px] text-[14px] font-[600] text-white hover:bg-white/10 transition backdrop-blur">
                  Explore Solutions
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-white/40">
                <span className="inline-flex items-center gap-2"><span className="h-px w-6 bg-white/15" /> Trusted delivery methodology</span>
                <span className="hidden sm:inline">•</span>
                <span>Business-first engineering</span>
                <span className="hidden sm:inline">•</span>
                <span>Noida, India — Serving Global Clients</span>
              </div>
            </div>
            <div className="relative lg:pl-4">
              <div className="relative rounded-[24px] border border-white/10 bg-[#0F141E]/80 backdrop-blur-xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-white/15" /><span className="h-3 w-3 rounded-full bg-white/10" /><span className="h-3 w-3 rounded-full bg-white/10" />
                  </div>
                  <span className="text-[11px] tracking-[0.1em] font-[600] text-white/40">NEXARA DIGITAL ARCHITECTURE — LIVE</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                </div>
                <div className="p-5 sm:p-7">
                  <svg viewBox="0 0 520 360" className="w-full h-auto" role="img" aria-label="Digital business ecosystem">
                    <g stroke="rgba(79,126,255,0.22)" strokeWidth="1.2" fill="none">
                      <path d="M260 110 L140 70 L80 140" /><path d="M260 110 L380 70 L440 140" /><path d="M260 110 L140 250 L80 220" /><path d="M260 110 L380 250 L440 220" /><path d="M260 110 L260 40" /><path d="M260 110 L100 110" /><path d="M260 110 L420 110" />
                    </g>
                    {[
                      [260,40,"CLOUD"],[80,70,"AI"],[440,70,"DATA"],[80,140,"APPS"],[440,140,"MOBILE"],[100,110,"AUTOMATION"],[420,110,"INTEGRATION"],[80,220,"ENTERPRISE"],[440,220,"ANALYTICS"]
                    ].map(([x,y,l])=>(
                      <g key={String(l)}>
                        <rect x={Number(x)-44} y={Number(y)-16} width="88" height="32" rx="10" fill="#131A27" stroke="rgba(255,255,255,0.08)" />
                        <text x={x as number} y={Number(y)+4} textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="0.08em" fill="rgba(255,255,255,0.7)">{String(l)}</text>
                      </g>
                    ))}
                    <g>
                      <rect x="190" y="82" width="140" height="56" rx="14" fill="#4F7EFF" />
                      <text x="260" y="106" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="0.06em" fill="white">NEXARA CORE</text>
                      <text x="260" y="120" textAnchor="middle" fontSize="8" letterSpacing="0.14em" fill="rgba(255,255,255,0.85)">ORCHESTRATION</text>
                    </g>
                    <g>
                      <rect x="60" y="285" width="400" height="52" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" />
                      <text x="70" y="302" fontSize="8" letterSpacing="0.12em" fill="rgba(255,255,255,0.4)">BUSINESS DATA → AI → AUTOMATION → DECISION → OUTCOME</text>
                      <g transform="translate(70,314)">
                        <rect width="70" height="4" rx="2" fill="#4F7EFF" /><rect x="84" width="70" height="4" rx="2" fill="#22D3EE" /><rect x="168" width="70" height="4" rx="2" fill="#4F7EFF" opacity="0.6" /><rect x="252" width="70" height="4" rx="2" fill="white" opacity="0.5" />
                      </g>
                    </g>
                  </svg>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[["99.9%","Uptime target architecture"],["API-first","Integration layer"],["AI-ready","From day one"]].map(([v,l])=>(
                      <div key={v} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3">
                        <div className="text-[14px] font-[700] text-white">{v}</div>
                        <div className="text-[11px] text-white/45 leading-tight">{l as string}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 left-6 right-6 h-10 bg-[#4F7EFF]/20 blur-2xl rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-white/[0.06] bg-white/[0.02] backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <p className="text-[11px] tracking-[0.16em] font-[700] text-white/35 shrink-0">TECHNOLOGY CAPABILITIES ACROSS THE DIGITAL ENTERPRISE</p>
            <div className="h-px lg:h-6 lg:w-px bg-white/10 shrink-0" />
            <div className="flex flex-wrap gap-2">
              {["AI & Automation","Enterprise Software","SaaS Products","Mobile Applications","Cloud & Integration","Technology Resources"].map(t=>(
                <span key={t} className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-[600] tracking-[-0.01em] text-white/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Challenges */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid lg:grid-cols-[0.95fr_1.15fr] gap-10 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-[84px]">
            <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">THE BUSINESS CHALLENGE</p>
            <h2 className="mt-3 font-[var(--font-jakarta)] text-[30px] sm:text-[36px] font-[800] tracking-[-0.03em] leading-[1.05] text-white">Technology should solve business problems — not create more of them.</h2>
            <p className="mt-4 text-[14px] leading-6 text-white/55 max-w-[480px]">We work with leadership teams who need technology to move faster, connect better and deliver measurable outcomes.</p>
            <div className="mt-6 rounded-2xl border border-[#4F7EFF]/20 bg-[#4F7EFF]/10 px-5 py-4">
              <p className="text-[13px] font-[600] leading-6 text-white">Nexara brings strategy, engineering, AI and technology expertise together to solve these challenges.</p>
              <p className="mt-1 text-xs text-white/60">Outcome-driven architecture, not feature lists. <Link href="/solutions" className="text-white underline decoration-white/20 hover:decoration-white">Explore solutions →</Link></p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ["Disconnected systems","Business information is spread across multiple applications that don't talk to each other."],
              ["Manual processes","Teams spend time on repetitive operations that should be automated."],
              ["Legacy technology","Old systems slow innovation and increase maintenance costs."],
              ["Difficult scaling","Technology cannot keep pace with business growth and demand."],
              ["Data without intelligence","Organizations collect data but struggle to turn it into useful decisions."],
              ["Digital product complexity","Building and maintaining modern software requires multiple technical disciplines."],
            ].map(([title,desc])=>(
              <div key={title} className="group rounded-2xl border border-white/5 bg-[#0F141E] p-6 hover:border-white/10 hover:bg-[#131A27] transition">
                <div className="h-8 w-8 rounded-lg bg-white/[0.06] border border-white/5 flex items-center justify-center"><span className="h-2 w-2 rounded-full bg-[#4F7EFF]" /></div>
                <h3 className="mt-4 text-[14px] font-[700] tracking-[-0.01em] text-white">{title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-white/50">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions overview — links to /solutions */}
      <section className="border-t border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">SOLUTIONS OVERVIEW</p>
              <h2 className="mt-3 font-[var(--font-jakarta)] text-[30px] sm:text-[38px] font-[800] tracking-[-0.03em] leading-none text-white">Solutions That Move<br /> Businesses Forward</h2>
            </div>
            <div className="max-w-[420px]">
              <p className="text-sm leading-6 text-white/50">Organized around business outcomes. Each solution is a dedicated destination with its own narrative.</p>
              <Link href="/solutions" className="mt-3 inline-flex text-sm font-[600] text-[#4F7EFF] hover:text-white transition">View all solutions →</Link>
            </div>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.slice(0,6).map(s=>(
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="group relative rounded-[20px] border border-white/5 bg-[#0F141E] p-6 sm:p-7 hover:border-[#4F7EFF]/20 hover:bg-[#131A27] transition overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#4F7EFF]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.14em] font-[700] text-white/30">{s.k}</span>
                    <span className="h-7 w-7 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/15 transition">↗</span>
                  </div>
                  <h3 className="mt-3 text-[16px] font-[700] tracking-[-0.01em] text-white">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-white/50">{s.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.bullets.slice(0,3).map(b=>(
                      <li key={b} className="flex items-center gap-2 text-xs text-white/60"><span className="h-1 w-1 rounded-full bg-[#4F7EFF]/70" /> {b}</li>
                    ))}
                  </ul>
                  <span className="mt-4 inline-flex text-xs font-[600] text-white/40 group-hover:text-white">Explore solution →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-5">
            {solutions.slice(6).map(s=>(
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="group flex items-center justify-between rounded-2xl border border-white/5 bg-[#0F141E] px-6 py-5 hover:border-white/10 hover:bg-[#131A27] transition">
                <div>
                  <div className="text-[11px] tracking-[0.12em] font-[700] text-white/30">{s.k} — SOLUTION</div>
                  <div className="mt-1 text-[14px] font-[700] text-white">{s.title}</div>
                  <div className="text-xs text-white/50 mt-1">{s.desc}</div>
                </div>
                <span className="ml-4 shrink-0 h-9 w-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/60 group-hover:text-white">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI overview */}
      <section className="relative overflow-hidden border-y border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(79,126,255,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div>
              <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">SIGNATURE CAPABILITY</p>
              <h2 className="mt-3 font-[var(--font-jakarta)] text-[30px] sm:text-[38px] font-[800] tracking-[-0.03em] leading-[0.95] text-white">AI That Works<br /> for Your Business</h2>
              <p className="mt-4 max-w-[520px] text-sm leading-6 text-white/55">AI becomes valuable when it is connected to real workflows, business data and measurable objectives. We identify practical opportunities and turn them into usable software.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 max-w-[520px]">
                {["AI assistants","Enterprise knowledge search","Document intelligence","Customer support automation","Workflow agents","Predictive analytics","AI-enabled SaaS","Intelligent reporting"].map(t=>(
                  <span key={t} className="inline-flex items-center gap-2 text-xs font-[500] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />{t}</span>
                ))}
              </div>
              <Link href="/solutions/ai-powered-software" className="mt-6 inline-flex rounded-full bg-white text-[#070A0F] px-5 py-2.5 text-sm font-[700] hover:bg-white/90 transition">Explore AI solutions →</Link>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-[#0F141E] p-6 sm:p-7">
              <p className="text-[11px] tracking-[0.14em] font-[700] text-white/40">BUSINESS DATA TO OUTCOME</p>
              <div className="mt-6 flex flex-col gap-3">
                {[
                  ["Business Data","CRM, ERP, docs, transactions, logs","#4F7EFF"],
                  ["AI Layer","LLM, ML, search, intelligence","#22D3EE"],
                  ["Automation","Workflows, agents, triggers","#4F7EFF"],
                  ["Decision","Insight, recommendation, alert","white"],
                  ["Outcome","Faster, cheaper, smarter operation","#4F7EFF"],
                ].map(([title,desc,color],i)=>(
                  <div key={title as string} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border bg-white/[0.04] text-[11px] font-[800]" style={{borderColor: color==="white"?"rgba(255,255,255,0.2)":(color as string)+"40", color: color==="white"?"white":color as string}}>{String(i+1).padStart(2,"0")}</span>
                      {i<4 && <span className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent mt-2" />}
                    </div>
                    <div className={`flex-1 rounded-xl border px-4 py-3 ${i===4?"bg-[#4F7EFF] border-[#4F7EFF] text-white":"bg-white/[0.03] border-white/5"}`}>
                      <div className="text-[13px] font-[700] text-white">{title as string}</div>
                      <div className={`text-xs ${i===4?"text-white/80":"text-white/45"}`}>{desc as string}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise architecture overview */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center max-w-[680px] mx-auto">
          <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">ENTERPRISE SYSTEMS</p>
          <h2 className="mt-3 font-[var(--font-jakarta)] text-[28px] sm:text-[36px] font-[800] tracking-[-0.03em] leading-none text-white">Connect the Systems<br /> That Run Your Business</h2>
          <p className="mt-4 text-sm leading-6 text-white/50">CRM, ERP, SCM, Finance, HR, Mobile, AI and Analytics — unified through a single integration layer. <Link href="/solutions/system-integration" className="text-[#4F7EFF] hover:text-white">Learn more →</Link></p>
        </div>
        <div className="mt-10 rounded-[24px] border border-white/5 bg-[#0F141E] overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-0">
            <div className="p-6 sm:p-8">
              <div className="relative mx-auto max-w-[420px] space-y-2">
                {[
                  ["CRM","Sales, customers, service"],
                  ["ERP","Finance, HR, inventory"],
                  ["SCM","Procurement, logistics, warehouse"],
                  ["Mobile","Android, iOS, enterprise apps"],
                  ["AI & Analytics","Intelligence, automation, insights"],
                ].map(([label,sub])=>(
                  <div key={label} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                    <span className="h-8 w-8 rounded-lg bg-[#4F7EFF]/15 border border-[#4F7EFF]/20 flex items-center justify-center text-[10px] font-[800] tracking-[0.08em] text-[#4F7EFF]">{label.slice(0,2)}</span>
                    <div className="flex-1"><div className="text-[13px] font-[700] text-white">{label}</div><div className="text-xs text-white/40">{sub}</div></div>
                    <span className="text-white/20">↕</span>
                  </div>
                ))}
                <div className="rounded-xl bg-[#4F7EFF] px-4 py-3 text-center">
                  <div className="text-xs tracking-[0.16em] font-[800] text-white">NEXARA DIGITAL ARCHITECTURE</div>
                  <div className="text-[11px] text-white/80">API & Integration Layer — The Connective Tissue</div>
                </div>
              </div>
            </div>
            <div className="border-t lg:border-t-0 lg:border-l border-white/5 bg-white/[0.02] p-6 sm:p-8">
              <h3 className="text-sm font-[700] text-white">More than isolated applications</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">We architect the integration layer that lets your systems share data, trigger workflows and deliver a unified operational view — instead of a patchwork of silos.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {["Unified data model","Event-driven APIs","Real-time sync","Secure by design","Observability built-in"].map(t=>(
                  <li key={t} className="flex items-center gap-2 text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-[#4F7EFF]" /> {t}</li>
                ))}
              </ul>
              <Link href="/solutions/enterprise-technology" className="mt-6 inline-flex rounded-full border border-white/10 bg-white text-[#070A0F] px-5 py-2 text-sm font-[700] hover:bg-white/90 transition">Discuss your architecture →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="border-t border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h2 className="font-[var(--font-jakarta)] text-[28px] sm:text-[34px] font-[800] tracking-[-0.03em] text-white">Our Technology Capabilities</h2>
            <div>
              <p className="max-w-[520px] text-sm leading-6 text-white/50">Comprehensive execution across the modern enterprise stack. One partner for strategy through to production.</p>
              <Link href="/services" className="mt-2 inline-flex text-sm font-[600] text-[#4F7EFF] hover:text-white transition">View all services →</Link>
            </div>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.slice(0,6).map(s=>(
              <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-2xl border border-white/5 bg-[#0F141E] p-6 hover:border-white/10 hover:bg-[#131A27] transition group">
                <div className="h-9 w-9 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/50 group-hover:text-white transition text-xs font-[700]">{s.title.slice(0,2).toUpperCase()}</div>
                <h3 className="mt-4 text-[14px] font-[700] text-white">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-white/50">{s.short}</p>
                <span className="mt-3 inline-flex text-xs font-[600] text-white/30 group-hover:text-white">Explore →</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {services.slice(6).map(s=>(
              <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-[500] text-white/60 hover:text-white hover:border-white/15 transition">{s.title}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries overview */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">INDUSTRIES</p>
            <h2 className="mt-3 font-[var(--font-jakarta)] text-[28px] sm:text-[34px] font-[800] tracking-[-0.03em] text-white">Built for how<br /> your industry works</h2>
          </div>
          <div className="max-w-[460px] self-end">
            <p className="text-sm leading-6 text-white/50">Each industry has distinct operations, regulation and customer expectations. We adapt technology to your domain — not the reverse.</p>
            <Link href="/industries" className="mt-2 inline-flex text-sm font-[600] text-[#4F7EFF] hover:text-white transition">View all industries →</Link>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {["Automotive","Healthcare","Financial Services","Retail","Manufacturing","Logistics","Education","Real Estate","E-commerce","Travel & Hospitality","Professional Services"].map((ind,i)=> {
            const slugs=["automotive","healthcare","financial-services","retail","manufacturing","logistics","education","real-estate","ecommerce","travel-hospitality","professional-services"];
            return (
              <Link key={ind} href={`/industries/${slugs[i]}`} className="group rounded-2xl border border-white/5 bg-[#0F141E] px-5 py-5 hover:border-[#4F7EFF]/20 hover:bg-[#131A27] transition">
                <div className="text-[13px] font-[600] text-white group-hover:text-white">{ind}</div>
                <div className="mt-1 text-xs text-white/40 group-hover:text-white/60">What can Nexara solve here? →</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Technology overview */}
      <section className="border-y border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center max-w-[640px] mx-auto">
            <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">TECHNOLOGY</p>
            <h2 className="mt-3 font-[var(--font-jakarta)] text-[28px] sm:text-[34px] font-[800] tracking-[-0.03em] text-white">Built With the Right Technology</h2>
            <p className="mt-3 text-sm leading-6 text-white/50">We select technology based on your requirements, scale and maintainability — not trends. <Link href="/technologies" className="text-[#4F7EFF] hover:text-white">Explore stack →</Link></p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["Frontend",["React","Next.js","Angular","Vue","TypeScript"]],
              ["Backend",["Node.js","NestJS","Python","Java",".NET"]],
              ["Mobile",["Android / Kotlin","iOS / Swift","Flutter","React Native"]],
              ["AI & Data",["Python","Machine Learning","Generative AI","LLM integrations","Data Analytics"]],
              ["Databases",["PostgreSQL","MySQL","MongoDB","Redis","SQL Server"]],
              ["Cloud",["AWS","Azure","Google Cloud","Docker","Kubernetes","CI/CD"]],
            ].map(([cat, items])=>(
              <div key={String(cat)} className="rounded-2xl border border-white/5 bg-[#0F141E] p-6">
                <h3 className="text-xs tracking-[0.14em] font-[700] text-white/60">{String(cat).toUpperCase()}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(items as string[]).map(t=>(
                    <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-[500] text-white/70">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nexara */}
      <section className="border-b border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-[720px]">
            <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">WHY NEXARA</p>
            <h2 className="mt-3 font-[var(--font-jakarta)] text-[28px] sm:text-[36px] font-[800] tracking-[-0.03em] leading-[0.95] text-white">Technology Expertise.<br /> Business Perspective.<br /> One Delivery Partner.</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["Business-first engineering","Technology decisions start with business requirements, not the other way around."],
              ["End-to-end delivery","Strategy, design, engineering, testing and deployment under one accountable partner."],
              ["Modern architecture","Scalable, maintainable systems built with the right technology — not the trending one."],
              ["AI-ready thinking","We identify practical opportunities for automation and intelligence in your workflows."],
              ["Flexible engagement","Project teams, dedicated resources or long-term engineering partnerships."],
              ["Long-term partnership","Support, optimization and evolution well beyond the initial launch."],
            ].map(([t,d])=>(
              <div key={t} className="rounded-2xl border border-white/5 bg-[#0F141E] p-6">
                <div className="h-8 w-8 rounded-lg bg-[#4F7EFF]/12 border border-[#4F7EFF]/20 flex items-center justify-center"><span className="h-2 w-2 rounded-full bg-[#4F7EFF]" /></div>
                <h3 className="mt-4 text-[14px] font-[700] text-white">{t}</h3>
                <p className="mt-2 text-[13px] leading-6 text-white/50">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process overview */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="lg:w-[360px] shrink-0">
            <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">DELIVERY PROCESS</p>
            <h2 className="mt-3 font-[var(--font-jakarta)] text-[28px] sm:text-[34px] font-[800] tracking-[-0.03em] text-white">How we deliver</h2>
            <p className="mt-3 text-sm leading-6 text-white/50">A transparent journey from idea to evolution. Established engineering process, not a generic six-card component.</p>
            <Link href="/process" className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-[600] text-white hover:bg-white/10 transition">View full process →</Link>
            <Link href="/contact?type=new-project" className="mt-3 hidden lg:inline-flex rounded-full bg-[#4F7EFF] text-white px-5 py-2.5 text-sm font-[700] hover:bg-[#3E6AF0] transition ml-3">Start with Discovery →</Link>
          </div>
          <div className="flex-1 relative">
            <div className="hidden lg:block absolute left-[28px] top-6 bottom-6 w-px bg-gradient-to-b from-[#4F7EFF]/40 via-white/10 to-transparent" />
            <div className="grid gap-4">
              {[
                ["01","Discover","Understand goals, users, processes and constraints before writing a line of code."],
                ["02","Define","Convert business requirements into a clear product and technology roadmap."],
                ["03","Design","Create user experiences and technical architecture aligned to outcomes."],
                ["04","Build","Develop, integrate and test the solution with transparent sprints."],
                ["05","Launch","Deploy, stabilize and hand over with documentation and training."],
                ["06","Evolve","Optimize, automate, scale and continuously improve based on data."],
              ].map(([n,t,d])=>(
                <div key={n} className="group relative flex gap-4 rounded-2xl border border-white/5 bg-[#0F141E] p-5 sm:p-6 hover:border-white/10 hover:bg-[#131A27] transition">
                  <div className="hidden lg:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4F7EFF] text-white font-[800] text-sm shadow-[0_8px_20px_rgba(79,126,255,0.3)]">{n}</div>
                  <div className="lg:hidden shrink-0 text-xs tracking-[0.12em] font-[800] text-[#4F7EFF] pt-1">{n}</div>
                  <div>
                    <h3 className="text-[15px] font-[700] text-white">{t}</h3>
                    <p className="mt-1 text-[13px] leading-6 text-white/50">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights preview */}
      <section className="border-y border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">INSIGHTS</p>
              <h2 className="mt-3 font-[var(--font-jakarta)] text-[28px] sm:text-[34px] font-[800] tracking-[-0.03em] text-white">Ideas that demonstrate expertise</h2>
            </div>
            <div className="max-w-[460px] self-end">
              <p className="text-sm leading-6 text-white/50">Editorial content focused on business outcomes, not keyword stuffing.</p>
              <Link href="/insights" className="mt-2 inline-flex text-sm font-[600] text-[#4F7EFF] hover:text-white transition">View insights →</Link>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              ["AI","How AI Can Automate Repetitive Business Workflows","5 min — Workflow automation, AI assistants, document intelligence","/insights/ai"],
              ["Digital Transformation","When Should a Business Replace a Legacy System?","4 min — Modernization strategy & risk","/insights/digital-transformation"],
              ["Enterprise Software","CRM vs Custom Business Platform: What Should You Build?","6 min — Architecture decisions","/insights/enterprise-software"],
            ].map(([cat,title,meta,href])=>(
              <Link key={title as string} href={href as string} className="group rounded-2xl border border-white/5 bg-[#0F141E] p-6 hover:border-white/10 hover:bg-[#131A27] transition">
                <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-[700] tracking-[0.08em] text-white/50">{cat as string}</span>
                <h3 className="mt-4 text-[14px] font-[700] leading-6 text-white group-hover:text-[#4F7EFF] transition">{title as string}</h3>
                <p className="mt-2 text-xs text-white/40">{meta as string}</p>
                <span className="mt-4 inline-flex text-xs font-[600] text-white/60 group-hover:text-white">Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="border-y border-white/[0.06] bg-[#0C1018]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">CAREERS</p>
              <h2 className="mt-3 font-[var(--font-jakarta)] text-[30px] sm:text-[38px] font-[800] tracking-[-0.04em] leading-[0.95] text-white">Build Your Next Chapter</h2>
              <p className="mt-4 max-w-[520px] text-sm leading-6 text-white/55">Explore opportunities to work across software engineering, AI, cloud, mobile and digital transformation. Join a team turning complex challenges into practical systems.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/careers" className="inline-flex items-center gap-2 rounded-full bg-white text-[#070A0F] px-6 py-2.5 text-sm font-[700] hover:bg-white/90 transition">Explore Careers →</Link>
                <Link href="/careers/send-resume" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-2.5 text-sm font-[600] text-white hover:bg-white/10 transition">Send Your Resume</Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <Link href="/careers/job-search" className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/60 hover:text-white hover:border-white/15">Job Search</Link>
                <Link href="/careers/students" className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/60 hover:text-white hover:border-white/15">Students</Link>
                <Link href="/careers/contract-opportunities" className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/60 hover:text-white hover:border-white/15">Contract</Link>
                <Link href="/careers/talent-community" className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/60 hover:text-white hover:border-white/15">Talent Community</Link>
              </div>
            </div>
            <div className="rounded-[20px] border border-white/5 bg-[#0F141E] p-6 grid grid-cols-2 gap-3">
              {[
                ["Software Engineering", "Product & platform"],
                ["AI & Data", "Intelligence & automation"],
                ["Mobile Development", "Android · iOS"],
                ["UI/UX", "Design systems"],
                ["QA & Testing", "Quality & reliability"],
                ["DevOps & Cloud", "Scale & operations"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="text-sm font-[600] text-white">{t}</div>
                  <div className="text-xs text-white/40">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="rounded-[24px] border border-[#4F7EFF]/20 bg-gradient-to-br from-[#4F7EFF]/15 via-[#0F141E] to-[#0F141E] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_90%_10%,rgba(34,211,238,0.12),transparent_60%)]" />
          <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div>
              <p className="text-[11px] tracking-[0.18em] font-[700] text-[#4F7EFF]">START A CONVERSATION</p>
              <h2 className="mt-3 font-[var(--font-jakarta)] text-[30px] sm:text-[38px] font-[800] tracking-[-0.03em] leading-[0.95] text-white">Let&apos;s build what<br /> your business needs.</h2>
              <p className="mt-4 max-w-[520px] text-sm leading-6 text-white/60">Tell us about your project. We&apos;ll respond with a clear next step — no aggressive sales, just a practical conversation.</p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link href="/contact?type=new-project" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4F7EFF] px-8 py-3.5 text-[14px] font-[700] text-white hover:bg-[#3E6AF0] transition shadow-[0_8px_32px_rgba(79,126,255,0.35)] w-full lg:w-auto">
                Start a Project →
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-8 py-3.5 text-[14px] font-[600] text-white hover:bg-white/10 transition w-full lg:w-auto">
                Talk to our team
              </Link>
              <p className="text-xs text-white/35 text-center lg:text-right">3rd Floor, D23 Building, S3V Business Park, Sector-59, Noida — +91 9696305326</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
