"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Field, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import { PROJECT_STATUSES } from "@/lib/constants";

const EMPTY = {
  title: "",
  description: "",
  tags: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  year: String(new Date().getFullYear()),
  status: "released",
  image: "",
  video: "",
};

export function ProjectForm({ initial, onSaved, onCancel }) {
  const isEdit = !!initial;
  const [form, setForm] = useState(
    initial ? { ...EMPTY, ...initial, tags: (initial.tags || []).join(", ") } : EMPTY
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/projects/${initial.id}` : "/api/projects";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not save this project.");
        return;
      }
      onSaved(data);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mb-5 rounded-[14px] border border-line bg-surface p-[22px]">
      <h3 className="mb-4 font-display text-base font-semibold text-text">
        {isEdit ? "Edit project" : "New project"}
      </h3>
      <form onSubmit={submit}>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Title">
            <TextInput value={form.title} onChange={set("title")} placeholder="Project name" required />
          </Field>
          <Field label="Year">
            <TextInput value={form.year} onChange={set("year")} placeholder="2026" />
          </Field>
        </div>

        <Field label="Description">
          <TextArea
            value={form.description}
            onChange={set("description")}
            placeholder="One or two sentences about what it does and the impact it had."
          />
        </Field>

        <Field label="Tags (comma separated)">
          <TextInput value={form.tags} onChange={set("tags")} placeholder="React, Node.js, PostgreSQL" />
        </Field>

        <Field label="Status">
          <select
            value={form.status}
            onChange={set("status")}
            className="w-full rounded-[7px] border border-line bg-surface-2 px-3 py-[9px] font-body text-sm text-text outline-none transition-colors focus:border-blue"
          >
            {Object.entries(PROJECT_STATUSES).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Live URL">
            <TextInput value={form.liveUrl} onChange={set("liveUrl")} placeholder="https://..." />
          </Field>
          <Field label="GitHub URL">
            <TextInput value={form.githubUrl} onChange={set("githubUrl")} placeholder="https://github.com/..." />
          </Field>
        </div>

        <div className="mt-2 rounded-[10px] border border-line bg-void p-4">
          <h4 className="mb-1 font-display text-[14px] font-semibold text-text">Media (shown on project page)</h4>
          <p className="mb-4 font-body text-[12.5px] text-muted">
            Optional. Add a video (YouTube link or direct .mp4 URL) or an image — video takes priority if
            both are set. Shown at the top of this project&apos;s dedicated page.
          </p>
          <Field label="Video URL (YouTube or .mp4)">
            <TextInput value={form.video} onChange={set("video")} placeholder="https://youtube.com/watch?v=..." />
          </Field>
          <Field label="Image URL" className="mb-0">
            <TextInput value={form.image} onChange={set("image")} placeholder="https://... or /your-image.png" />
          </Field>
        </div>

        <label className="mb-5 mt-5 flex cursor-pointer select-none items-center gap-2">
          <input
            type="checkbox"
            checked={!!form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          <span className="font-body text-[13px] text-muted">Feature this project at the top</span>
        </label>

        {error && <p className="mb-3 font-body text-[13px] text-danger">{error}</p>}

        <div className="flex items-center gap-3">
          <PrimaryButton type="submit" icon={Check} disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Publish project"}
          </PrimaryButton>
          <GhostButton type="button" onClick={onCancel}>
            Cancel
          </GhostButton>
        </div>
      </form>
    </div>
  );
}