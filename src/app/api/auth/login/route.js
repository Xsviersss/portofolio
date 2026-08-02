import { NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/db";
import { COOKIE_NAME, SESSION_MAX_AGE_SECONDS, createSessionToken } from "@/lib/auth";

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));

  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const valid = await verifyAdminPassword(password);
  if (!valid) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return res;
}
