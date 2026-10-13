import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createSessionToken,
  safeEqual,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) {
    return NextResponse.json(
      {
        error:
          "Admin login is not configured. Set ADMIN_PASSWORD in the environment.",
      },
      { status: 503 },
    );
  }

  let submitted = "";
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = (await req.json().catch(() => null)) as {
      password?: unknown;
    } | null;
    submitted = typeof body?.password === "string" ? body.password : "";
  } else {
    const form = await req.formData().catch(() => null);
    submitted = form ? String(form.get("password") || "") : "";
  }

  if (!safeEqual(submitted, configured)) {
    // Dampen brute-force attempts. Not a substitute for a proper rate limit.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await createSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: "Session could not be created — set ADMIN_SESSION_SECRET." },
      { status: 500 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, adminCookieOptions());
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...adminCookieOptions(),
    maxAge: 0,
  });
  return res;
}
