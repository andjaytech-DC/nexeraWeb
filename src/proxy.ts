import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  isAdminAuthConfigured,
  verifySessionToken,
} from "@/lib/admin-auth";

/** Reachable without a session, otherwise login could never happen. */
const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/api/admin/login"]);

/**
 * Guards the admin area. Next.js 16 renamed `middleware.ts` to `proxy.ts`;
 * this runs on the Node.js runtime by default.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (await verifySessionToken(token)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    const configured = isAdminAuthConfigured();
    return NextResponse.json(
      {
        error: configured
          ? "Unauthorized"
          : "Admin auth is not configured — set ADMIN_PASSWORD.",
      },
      { status: configured ? 401 : 503 },
    );
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*"],
};
