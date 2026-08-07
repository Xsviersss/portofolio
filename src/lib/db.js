// Data store backed by Neon (serverless Postgres) instead of a local JSON
// file. This version works on Vercel and other read-only-filesystem hosts,
// since nothing is written to disk - every read/write goes over the wire to
// your Neon database.
//
// Every exported function keeps the exact same name and signature as the
// original file-based version, so nothing in the API routes had to change.

import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { DEFAULT_PROFILE, DEFAULT_PROJECTS, DEFAULT_PASSWORD } from "./constants";

if (!process.env.DATABASE_URL) {
  console.warn(
    "[db] DATABASE_URL is not set. Add your Neon connection string to .env.local (see .env.local.example)."
  );
}

// Lazy: only construct the client the first time a query actually runs.
// This means a missing DATABASE_URL surfaces as a clear error on the first
// real request instead of crashing the build or every unrelated import.
let _sql;
function sql(strings, ...values) {
  if (!_sql) _sql = neon(process.env.DATABASE_URL);
  return _sql(strings, ...values);
}

// Schema creation + seeding only needs to run once per server instance.
// This caches the in-flight/completed promise so concurrent requests don't
// race to create the same tables.
let ready;
function init() {
  if (!ready) ready = setup();
  return ready;
}

async function setup() {
  await sql`
    CREATE TABLE IF NOT EXISTS profile (
      id INT PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS admin (
      id INT PRIMARY KEY DEFAULT 1,
      password_hash TEXT NOT NULL
    )
  `;
await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      tags JSONB NOT NULL DEFAULT '[]',
      live_url TEXT NOT NULL DEFAULT '',
      github_url TEXT NOT NULL DEFAULT '',
      featured BOOLEAN NOT NULL DEFAULT false,
      year TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'released',
      image TEXT NOT NULL DEFAULT '',
      video TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'released'`;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS image TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS video TEXT NOT NULL DEFAULT ''`;

  const [{ count: profileCount }] = await sql`SELECT COUNT(*)::int AS count FROM profile`;
  if (Number(profileCount) === 0) {
    await sql`INSERT INTO profile (id, data) VALUES (1, ${JSON.stringify(DEFAULT_PROFILE)}::jsonb)`;
  }

  const [{ count: adminCount }] = await sql`SELECT COUNT(*)::int AS count FROM admin`;
  if (Number(adminCount) === 0) {
    const hash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    await sql`INSERT INTO admin (id, password_hash) VALUES (1, ${hash})`;
  }

  const [{ count: projectCount }] = await sql`SELECT COUNT(*)::int AS count FROM projects`;
  if (Number(projectCount) === 0) {
    for (const p of DEFAULT_PROJECTS) {
      await sql`
        INSERT INTO projects (id, title, description, tags, live_url, github_url, featured, year, created_at)
        VALUES (${p.id}, ${p.title}, ${p.description}, ${JSON.stringify(p.tags)}::jsonb, ${p.liveUrl}, ${p.githubUrl}, ${p.featured}, ${p.year}, ${p.createdAt})
      `;
    }
  }
}

function mapProject(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    tags: row.tags,
    liveUrl: row.live_url,
    githubUrl: row.github_url,
    featured: row.featured,
    year: row.year,
    createdAt: row.created_at,
  };
}

/* ---------------------------------- profile --------------------------------- */

export async function getProfile() {
  await init();
  const [row] = await sql`SELECT data FROM profile WHERE id = 1`;
  return row.data;
}

export async function updateProfile(next) {
  await init();
  const [current] = await sql`SELECT data FROM profile WHERE id = 1`;
  const merged = { ...current.data, ...next };
  await sql`UPDATE profile SET data = ${JSON.stringify(merged)}::jsonb WHERE id = 1`;
  return merged;
}

/* --------------------------------- projects ---------------------------------- */

export async function getProjects() {
  await init();
  const rows = await sql`SELECT * FROM projects ORDER BY featured DESC, created_at DESC`;
  return rows.map(mapProject);
}

export async function getProject(id) {
  await init();
  const [row] = await sql`SELECT * FROM projects WHERE id = ${id}`;
  return row ? mapProject(row) : null;
}

export async function createProject(project) {
  await init();
  await sql`
    INSERT INTO projects (id, title, description, tags, live_url, github_url, featured, year, created_at)
    VALUES (${project.id}, ${project.title}, ${project.description}, ${JSON.stringify(project.tags)}::jsonb, ${project.liveUrl}, ${project.githubUrl}, ${project.featured}, ${project.year}, ${project.createdAt})
  `;
  return project;
}

export async function updateProject(id, next) {
  await init();
  const existing = await getProject(id);
  if (!existing) return null;
  const merged = { ...existing, ...next, id };
  await sql`
    UPDATE projects SET
      title = ${merged.title},
      description = ${merged.description},
      tags = ${JSON.stringify(merged.tags)}::jsonb,
      live_url = ${merged.liveUrl},
      github_url = ${merged.githubUrl},
      featured = ${merged.featured},
      year = ${merged.year}
    WHERE id = ${id}
  `;
  return merged;
}

export async function deleteProject(id) {
  await init();
  const result = await sql`DELETE FROM projects WHERE id = ${id} RETURNING id`;
  return result.length > 0;
}

/* ----------------------------------- admin ------------------------------------ */

export async function verifyAdminPassword(candidate) {
  await init();
  const [row] = await sql`SELECT password_hash FROM admin WHERE id = 1`;
  if (!row) return false;
  return bcrypt.compare(candidate, row.password_hash);
}

export async function setAdminPassword(newPassword) {
  await init();
  const hash = await bcrypt.hash(newPassword, 10);
  await sql`UPDATE admin SET password_hash = ${hash} WHERE id = 1`;
}
