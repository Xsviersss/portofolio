"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Field, TextInput, TextArea } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState(null);
  const [flash, setFlash] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => setProfile({ ...data, skills: (data.skills || []).join(", ") }));
  }, []);

  function set(key) {
    return (e) => setProfile({ ...profile, [key]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile({ ...data, skills: (data.skills || []).join(", ") });
        setFlash("Profile updated.");
        setTimeout(() => setFlash(""), 1800);
      }
    } finally {
      setSaving(false);
    }
  }

  if (!profile) return <p className="font-body text-sm text-muted">Loading…</p>;

  return (
    <div>
      {flash && (
        <div className="mb-[18px] inline-flex items-center gap-2 rounded-lg border border-blue/30 bg-blue/10 px-3.5 py-[9px] font-body text-[13px] text-blue-2">
          <Check size={14} /> {flash}
        </div>
      )}

      <h2 className="mb-[18px] font-display text-[22px] font-semibold text-text">Profile</h2>

      <form onSubmit={submit}>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Name">
            <TextInput value={profile.name} onChange={set("name")} />
          </Field>
          <Field label="Role">
            <TextInput value={profile.role} onChange={set("role")} />
          </Field>
        </div>

        <Field label="Tagline (hero headline subtext)">
          <TextArea value={profile.tagline} onChange={set("tagline")} />
        </Field>

        <Field label="Availability note (small badge in hero)">
          <TextInput value={profile.heroNote} onChange={set("heroNote")} />
        </Field>

        <Field label="About text">
          <TextArea value={profile.about} onChange={set("about")} />
        </Field>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="Location">
            <TextInput value={profile.location} onChange={set("location")} />
          </Field>
          <Field label="Email">
            <TextInput value={profile.email} onChange={set("email")} />
          </Field>
        </div>

        <Field label="Skills (comma separated)">
          <TextInput value={profile.skills} onChange={set("skills")} />
        </Field>

        <div className="grid gap-x-4 sm:grid-cols-3">
          <Field label="GitHub URL">
            <TextInput value={profile.github} onChange={set("github")} />
          </Field>
          <Field label="LinkedIn URL">
            <TextInput value={profile.linkedin} onChange={set("linkedin")} />
          </Field>
          <Field label="Twitter URL">
            <TextInput value={profile.twitter} onChange={set("twitter")} />
          </Field>
        </div>

        <PrimaryButton type="submit" icon={Check} disabled={saving}>
          {saving ? "Saving…" : "Save profile"}
        </PrimaryButton>
      </form>
    </div>
  );
}
