import { NextResponse } from "next/server";
import { getProject, updateProject, deleteProject } from "@/lib/db";
import { isAdmin } from "@/lib/session";

export async function PUT(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getProject(id);
  if (!existing) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.title || !body.title.trim()) {
    return NextResponse.json({ error: "A project title is required." }, { status: 400 });
  }

  const tags = Array.isArray(body.tags)
    ? body.tags
    : String(body.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

  const updated = await updateProject(id, {
    title: body.title.trim(),
    description: body.description || "",
    tags,
    liveUrl: body.liveUrl || "",
    githubUrl: body.githubUrl || "",
    featured: !!body.featured,
    year: body.year || existing.year,
  });

  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const ok = await deleteProject(id);
  if (!ok) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
