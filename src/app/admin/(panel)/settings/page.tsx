import { SettingsControls } from "./SettingsControls";

export const dynamic = "force-dynamic";

function Status({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
      <span className="text-sm text-white/70">{label}</span>
      <span
        className={`rounded-full border px-2.5 py-0.5 text-xs font-[700] ${
          ok
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
            : "border-amber-500/20 bg-amber-500/10 text-amber-300"
        }`}
      >
        {ok ? "Configured" : "Not configured"}
      </span>
    </div>
  );
}

export default async function AdminSettings() {
  const useApi = process.env.NEXT_PUBLIC_INQUIRY_API === "1";
  const dbConfigured = Boolean(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("user:password"));
  const blobConfigured = Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );
  const contactWebhook = Boolean(process.env.CONTACT_WEBHOOK_URL);
  const careersWebhook = Boolean(process.env.CAREERS_WEBHOOK_URL);

  return (
    <div className="mx-auto max-w-[900px] px-5 sm:px-6 lg:px-8 py-8">
      <h1 className="text-[24px] font-[800] tracking-[-0.03em] text-white">Settings</h1>
      <p className="mt-2 text-sm text-white/50">
        Runtime configuration and storage status. Values are read from environment variables.
      </p>

      <div className="mt-6 space-y-6">
        <section className="rounded-2xl border border-white/5 bg-[#0F141E] p-7 space-y-4">
          <h2 className="text-sm font-[700] text-white">Storage status</h2>
          <div className="space-y-2">
            <Status ok={useApi} label="Inquiry API mode (NEXT_PUBLIC_INQUIRY_API)" />
            <Status ok={dbConfigured} label="Database (DATABASE_URL)" />
            <Status ok={blobConfigured} label="Vercel Blob storage" />
            <Status ok={contactWebhook} label="Contact webhook (CONTACT_WEBHOOK_URL)" />
            <Status ok={careersWebhook} label="Careers webhook (CAREERS_WEBHOOK_URL)" />
          </div>
          <p className="text-xs leading-5 text-white/40">
            Inquiry storage mode:{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5">
              {useApi ? "ApiInquiryRepository" : "LocalInquiryRepository"}
            </code>
            . Careers/resume intake falls back to file storage when the database is not configured.
          </p>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#0F141E] p-7 space-y-4">
          <h2 className="text-sm font-[700] text-white">Replaceable storage layer</h2>
          <p className="text-sm leading-6 text-white/60">
            All inquiry reads/writes go through{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">InquiryRepository</code> (
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/lib/inquiry-store.ts</code>).
            <br />• <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">LocalInquiryRepository</code> — demo, localStorage, no cross-device sync.
            <br />• <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">ApiInquiryRepository</code> — stubbed fetch — implement when your backend is ready.
            <br />Switch with{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_INQUIRY_API=1</code>.
          </p>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#0F141E] p-7 space-y-4">
          <h2 className="text-sm font-[700] text-white">Demo store controls</h2>
          <SettingsControls />
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#0F141E] p-7 space-y-4">
          <h2 className="text-sm font-[700] text-white">Security</h2>
          <p className="text-sm leading-6 text-white/60">
            Do not store sensitive customer data in browser storage. Production requires authentication, authorization, encryption, audit logs and a real database. This area is{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">noindex</code> and excluded from sitemap.
          </p>
        </section>
      </div>
    </div>
  );
}