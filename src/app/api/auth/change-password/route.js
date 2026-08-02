import { NextResponse } from "next/server";
import { verifyAdminPassword, setAdminPassword } from "@/lib/db";
import { isAdmin } from "@/lib/session";

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json().catch(() => ({}));

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Both current and new password are required." }, { status: 400 });
  }
  if (newPassword.length < 4) {
    return NextResponse.json({ error: "New password must be at least 4 characters." }, { status: 400 });
  }

  const valid = await verifyAdminPassword(currentPassword);
  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  await setAdminPassword(newPassword);
  return NextResponse.json({ ok: true });
}
