# Portfolio — with a built-in admin panel

A clean, SaaS-style personal portfolio site (black/blue theme) built with
Next.js. It ships with a password-protected admin panel at `/admin` where you
can publish, edit, and delete portfolio projects and edit your profile info —
changes appear on the live site instantly, no redeploy needed.

## Stack

- **Next.js 16** (App Router) — pages, API routes, proxy (middleware)
- **Tailwind CSS v4** — styling, theme tokens in `src/app/globals.css`
- **lucide-react** — icons
- **bcryptjs** — password hashing
- **Neon** (serverless Postgres) — database, works on Vercel and any other
  read-only-filesystem host since nothing is written to local disk

## Getting started

### 1. Create a free Neon database

1. Go to [neon.tech](https://neon.tech) and sign up (no credit card needed).
2. Create a new project.
3. On the project dashboard, copy the **connection string** (Connection
   Details). It looks like:
   ```
   postgresql://user:password@ep-xxxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### 2. Install and configure

```bash
npm install
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

- `SESSION_SECRET` — any random string (signs the admin session cookie).
  Generate one with `openssl rand -base64 32`.
- `DATABASE_URL` — the Neon connection string from step 1.

### 3. Run it

```bash
npm run dev
```

- Portfolio: http://localhost:3000
- Admin: http://localhost:3000/admin (or the small dot in the footer / lock
  icon in the nav)

**Default admin password:** `admin2026` — change it immediately from
Settings inside the admin panel.

The first time the app connects to your database it automatically creates
the tables it needs and seeds them with example profile info and two sample
projects. Edit or delete them from `/admin`.

## Project structure

```
src/
  app/
    page.js                     Public portfolio homepage (server component)
    layout.js                   Root layout, loads fonts
    globals.css                 Design tokens + Tailwind theme (black/blue)
    admin/
      login/page.js             Login screen
      (dashboard)/
        layout.js                Sidebar shell, server-side auth check
        page.js                  Redirects to /admin/projects
        projects/page.js         Manage projects (list, add, edit, delete)
        profile/page.js          Edit name, bio, skills, links, etc.
        settings/page.js         Change the admin password
    api/
      auth/login/route.js        POST — verify password, set session cookie
      auth/logout/route.js       POST — clear session cookie
      auth/change-password/route.js
      profile/route.js           GET (public) / PUT (admin only)
      projects/route.js          GET (public) / POST (admin only)
      projects/[id]/route.js     PUT / DELETE (admin only)
  components/
    ui/                          Button, Field/Input/Textarea, Tag
    site/                        Nav, Hero, Work, ProjectCard, About, Contact, Footer, Atmosphere
    admin/                       Sidebar, ProjectForm
  lib/
    db.js                        Reads/writes your Neon Postgres database
    auth.js                      Signed-cookie session helpers (Web Crypto, edge-safe)
    session.js                   getSession()/isAdmin() for route handlers & server components
    constants.js                 Default seed content
  proxy.js                       Redirects unauthenticated visitors away from /admin/*
                                  (Next.js 16's replacement for middleware.js)
```

## How the admin panel works

1. You open `/admin` (via the nav lock icon or the small dot in the footer).
2. `src/proxy.js` checks for a valid signed session cookie. No cookie →
   redirected to `/admin/login`.
3. Logging in posts your password to `/api/auth/login`, which checks it
   against the bcrypt hash stored in the database and, if correct, sets an
   httpOnly signed cookie.
4. Inside the dashboard, adding/editing/deleting a project calls the
   `/api/projects` routes, which write straight to your Neon database.
5. The homepage (`src/app/page.js`) is rendered dynamically
   (`export const dynamic = "force-dynamic"`) and reads that same database
   on every request, so new posts show up immediately — no cache to bust.

## Customizing the design

Colors, fonts, and a couple of reusable utility classes (the background grid
and glow) live in `src/app/globals.css` under the `:root` and `@theme`
blocks. Fonts are loaded via `next/font/google` in `src/app/layout.js`
(Space Grotesk for headings, Inter for body text, JetBrains Mono for labels).

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. On [vercel.com](https://vercel.com), sign up with GitHub (no credit card
   needed for the free Hobby plan) and import the repo.
3. In the project's **Settings → Environment Variables**, add:
   - `SESSION_SECRET`
   - `DATABASE_URL` (your Neon connection string)
4. Deploy. Vercel builds and hosts it automatically on every push.

This also works on any other Node host (Render, Railway, Fly.io, a VPS,
etc.) the same way — set the two environment variables and run
`npm run build && npm start`.

## Security notes

This is built for a single-owner personal portfolio, not a multi-tenant SaaS:

- One shared admin password, not per-user accounts.
- Sessions are signed (tamper-proof) but not encrypted — don't put secrets
  in the payload beyond the boolean flag it already uses.
- There's no rate limiting on the login endpoint. If you're deploying this
  publicly long-term, consider adding some (e.g. via your host or a
  middleware check).
- Keep `DATABASE_URL` and `SESSION_SECRET` out of version control — they're
  already excluded via `.gitignore` (`.env*`).
