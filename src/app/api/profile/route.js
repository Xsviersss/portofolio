import { NextResponse } from "next/server";
import { getProfile, updateProfile } from "@/lib/db";
import { isAdmin } from "@/lib/session";

export async function GET() {
  const profile = await getProfile();
  return NextResponse.json(profile);
}

export async function PUT(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const skills = Array.isArray(body.skills)
    ? body.skills
    : String(body.skills || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  const updated = await updateProfile({ ...body, skills });
  return NextResponse.json(updated);
}
