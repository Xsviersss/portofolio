# Portfolio Website + Admin Panel

Personal portfolio website built with Next.js with a simple admin dashboard.

The admin panel is available at `/admin` and allows managing portfolio projects
and profile information without touching the code. Any changes made from the
dashboard will appear directly on the website.

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- PostgreSQL (Neon)
- lucide-react
- bcryptjs

## Setup

### 1. Install dependencies

```bash
npm install

Create a .env.local file:

DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_random_secret

DATABASE_URL can be obtained from your Neon database connection settings.

For SESSION_SECRET, you can generate a random string:

openssl rand -base64 32

Running Locally

npm run dev

Open:

http://localhost:3000

Admin dashboard:

http://localhost:3000/admin

Default password:

admin2026

Change it after the first login.

# Features

- Dynamic portfolio projects
- Admin dashboard
- Edit profile information
- Add, update, and delete projects
- Password protected admin access
- Database powered content management


Structure

src/
 ├─ app/
 │  ├─ page.js
 │  ├─ admin/
 │  └─ api/
 │
 ├─ components/
 │  ├─ site/
 │  ├─ admin/
 │  └─ ui/
 │
 ├─ lib/
 │  ├─ db.js
 │  ├─ auth.js
 │  └─ session.js

Database

The app uses Neon PostgreSQL.

On the first connection, required tables are created automatically and default content is inserted.

Deployment

The project can be deployed on Vercel.

Add these environment variables:

DATABASE_URL
SESSION_SECRET

Then deploy normally.

It also works on other Node.js hosting platforms.

Notes

This project is intended for a personal portfolio.

The admin system uses a single password authentication system. For bigger applications, additional security features like rate limiting and multiple user accounts should be added.