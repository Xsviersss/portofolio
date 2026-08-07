import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/db";
import { isAdmin } from "@/lib/session";
import { randomUUID } from "node:crypto";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
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

  const project = {
    id: randomUUID(),
    title: body.title.trim(),
    description: body.description || "",
    tags,
    liveUrl: body.liveUrl || "",
    githubUrl: body.githubUrl || "",
    featured: !!body.featured,
    year: body.year || String(new Date().getFullYear()),
    status: body.status || "released",
    image: body.image || "",
    video: body.video || "",
    createdAt: new Date().toISOString(),
  };

  await createProject(project);
  return NextResponse.json(project, { status: 201 });
}
