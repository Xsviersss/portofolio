// Default content used the very first time the app runs (no data/db.json yet).
// Everything here is editable afterwards from /admin.

export const DEFAULT_PASSWORD = "admin2026";

export const DEFAULT_PROFILE = {
  name: "Alex Rivera",
  role: "Product Engineer",
  tagline: "I design and build software that feels inevitable.",
  heroNote: "Currently building developer tools · Open to select freelance work",
  about:
    "I'm a product engineer who moves between design and code. Over the last six years I've shipped interfaces for startups and platform teams, with a focus on speed, clarity, and details most people skip. I care about the fifty milliseconds between a click and a response.",
  email: "hello@alexrivera.dev",
  github: "https://github.com",
  youtube: "https://youtube.com",
  location: "Lisbon, Portugal",
  skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Figma", "Go", "AWS", "GraphQL"],
};

export const DEFAULT_PROJECTS = [
  {
    id: "p1",
    title: "Ledger",
    description: "A reconciliation engine for finance teams, cutting close time from days to hours.",
    tags: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    year: "2025",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "p2",
    title: "Northstar",
    description: "Internal analytics dashboard used by 40+ engineering teams to track deploy health.",
    tags: ["TypeScript", "GraphQL"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    year: "2024",
    createdAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "p3",
    title: "Fieldnote",
    description: "A minimal note-taking app for researchers, built around offline-first sync.",
    tags: ["Go", "SQLite"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    year: "2023",
    createdAt: "2023-03-01T00:00:00.000Z",
  },
];
