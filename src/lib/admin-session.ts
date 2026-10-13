import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";

/**
 * Defence in depth: `src/proxy.ts` already gates /api/admin/*, but per Next.js
 * guidance authorization should also be re-checked inside the route handler.
 */
export async function isAdminRequest(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}
