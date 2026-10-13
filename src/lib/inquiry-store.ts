// ─────────────────────────────────────────────────────────────────────────────
// Inquiry data abstraction — REPLACEABLE STORAGE LAYER
// ─────────────────────────────────────────────────────────────────────────────
// Goal: Keep the admin UX complete today, without locking Nexara into an
// insecure browser-only workflow tomorrow.
//
// Architecture:
//   UI (admin / contact) → InquiryRepository interface → concrete adapter
//   Current adapter: LocalInquiryRepository (localStorage, demo-only)
//   Future adapter:  ApiInquiryRepository (real DB/API, secure, multi-user)
//
// To switch to a real backend:
//   1. Implement ApiInquiryRepository methods to call your API (see stub below).
//   2. Set NEXT_PUBLIC_INQUIRY_API=1 (or flip the flag in getInquiryRepository()).
//   3. No UI changes required — all callers depend only on the interface.
//
// IMPORTANT: localStorage is NOT a production DB. Do not store sensitive data
// here, do not expect cross-device sharing, and do not treat it as secure.
// The local adapter exists solely to unblock UX development.
// ─────────────────────────────────────────────────────────────────────────────

export type InquiryStatus = "NEW" | "CONTACTED" | "IN_DISCUSSION" | "PROPOSAL_SENT" | "WON" | "CLOSED";
export type ProjectType = "New Product" | "Existing System Modernization" | "Enterprise Application" | "AI / Automation" | "Mobile Application" | "Integration" | "Support / Maintenance" | "Other";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  projectType: ProjectType | string;
  budget: string;
  timeline: string;
  description: string;
  preferredContact: string;
  status: InquiryStatus;
  createdAt: string; // ISO
  notes?: string;
}

// ── Repository contract — UI depends ONLY on this ──
export interface InquiryRepository {
  list(): Promise<Inquiry[]>;
  get(id: string): Promise<Inquiry | undefined>;
  create(data: Omit<Inquiry, "id" | "createdAt" | "status"> & Partial<Pick<Inquiry, "status">>): Promise<Inquiry>;
  update(id: string, patch: Partial<Inquiry>): Promise<void>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
}

// ── Helpers (pure, no storage) ──
export const statusLabels: Record<InquiryStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  IN_DISCUSSION: "In Discussion",
  PROPOSAL_SENT: "Proposal Sent",
  WON: "Won",
  CLOSED: "Closed",
};
export const statusColors: Record<InquiryStatus, string> = {
  NEW: "bg-[#4F7EFF]/15 text-[#8AA8FF] border-[#4F7EFF]/20",
  CONTACTED: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  IN_DISCUSSION: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  PROPOSAL_SENT: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  WON: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  CLOSED: "bg-white/5 text-white/40 border-white/10",
};
export const serviceOptions = [
  "Custom Software","CRM","ERP","SCM","SaaS","AI Software","Mobile","iOS","Enterprise Software","Cloud & Integration","BPO","Resource Management","Other",
];
export const projectTypeOptions: string[] = ["New Product","Existing System Modernization","Enterprise Application","AI / Automation","Mobile Application","Integration","Support / Maintenance","Other"];

// ── Local adapter — demo only ──
const KEY = "nexara_inquiries_v1";
function isBrowser() { return typeof window !== "undefined" && typeof localStorage !== "undefined"; }
function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return (crypto as unknown as { randomUUID: () => string }).randomUUID();
  return String(Date.now()) + Math.random().toString(36).slice(2);
}

class LocalInquiryRepository implements InquiryRepository {
  async list(): Promise<Inquiry[]> {
    if (!isBrowser()) return [];
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
    } catch { return []; }
  }
  async get(id: string): Promise<Inquiry | undefined> {
    const all = await this.list();
    return all.find((i) => i.id === id);
  }
  async create(data: Omit<Inquiry, "id" | "createdAt" | "status"> & Partial<Pick<Inquiry, "status">>): Promise<Inquiry> {
    const inquiry: Inquiry = {
      id: uid(),
      createdAt: new Date().toISOString(),
      status: "NEW",
      notes: "",
      ...data,
    } as Inquiry;
    if (!isBrowser()) return inquiry;
    const all = await this.list();
    all.unshift(inquiry);
    localStorage.setItem(KEY, JSON.stringify(all));
    try { window.dispatchEvent(new CustomEvent("nexara:inquiry-created")); } catch {}
    return inquiry;
  }
  async update(id: string, patch: Partial<Inquiry>): Promise<void> {
    if (!isBrowser()) return;
    const all = await this.list();
    const idx = all.findIndex((i) => i.id === id);
    if (idx === -1) return;
    all[idx] = { ...all[idx], ...patch };
    localStorage.setItem(KEY, JSON.stringify(all));
  }
  async remove(id: string): Promise<void> {
    if (!isBrowser()) return;
    const all = (await this.list()).filter((i) => i.id !== id);
    localStorage.setItem(KEY, JSON.stringify(all));
  }
  async clear(): Promise<void> { if (isBrowser()) localStorage.removeItem(KEY); }
}

// ── API adapter — stub for future real backend ──
// Replace fetch URLs with your real endpoints. Keep the method signatures identical.
class ApiInquiryRepository implements InquiryRepository {
  private base = process.env.NEXT_PUBLIC_INQUIRY_API_URL || "/api/inquiries";
  async list(): Promise<Inquiry[]> {
    const res = await fetch(this.base, { cache: "no-store" });
    if (!res.ok) throw new Error(`list failed: ${res.status}`);
    return (await res.json()) as Inquiry[];
  }
  async get(id: string): Promise<Inquiry | undefined> {
    const res = await fetch(`${this.base}/${encodeURIComponent(id)}`, { cache: "no-store" });
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`get failed: ${res.status}`);
    return (await res.json()) as Inquiry;
  }
  async create(data: Omit<Inquiry, "id" | "createdAt" | "status"> & Partial<Pick<Inquiry, "status">>): Promise<Inquiry> {
    const res = await fetch(this.base, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error(`create failed: ${res.status}`);
    return (await res.json()) as Inquiry;
  }
  async update(id: string, patch: Partial<Inquiry>): Promise<void> {
    const res = await fetch(`${this.base}/${encodeURIComponent(id)}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(patch) });
    if (!res.ok) throw new Error(`update failed: ${res.status}`);
  }
  async remove(id: string): Promise<void> {
    const res = await fetch(`${this.base}/${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`remove failed: ${res.status}`);
  }
  async clear(): Promise<void> {
    // No-op for API — expose only if your backend supports bulk clear with auth.
    throw new Error("clear() is not supported in API mode");
  }
}

// ── Factory — single switch ──
function getInquiryRepository(): InquiryRepository {
  // Flip to "1" when your API is ready. No UI changes needed.
  const useApi = typeof process !== "undefined" && process.env.NEXT_PUBLIC_INQUIRY_API === "1";
  if (useApi) return new ApiInquiryRepository();
  return new LocalInquiryRepository();
}

// Primary export — UI should import this, not the concrete class
export const inquiryRepository: InquiryRepository = getInquiryRepository();

// ── Legacy alias — kept for backward compat, prefer inquiryRepository ──
// @deprecated Use inquiryRepository instead. Will be removed once all callers migrate.
export const inquiryStore = inquiryRepository;
