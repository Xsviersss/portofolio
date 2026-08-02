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

        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field label="GitHub URL">
            <TextInput value={profile.github} onChange={set("github")} />
          </Field>
          <Field label="YouTube URL">
            <TextInput value={profile.youtube} onChange={set("youtube")} />
          </Field>
        </div>

<div className="mt-2 rounded-[10px] border border-line bg-surface p-4">
          <h3 className="mb-1 font-display text-[15px] font-semibold text-text">My Other Half</h3>
          <p className="mb-4 font-body text-[12.5px] text-muted">
            A personal section for a fictional character that resonates with you. Leave any field empty
            to hide this section from the site. Use a transparent-background PNG for the image.
          </p>

          <Field label="Character name">
            <TextInput
              value={profile.otherHalfName || ""}
              onChange={set("otherHalfName")}
              placeholder="e.g. Armin Arlert"
            />
          </Field>

          <Field label="Image URL (transparent PNG)">
            <TextInput
              value={profile.otherHalfImage || ""}
              onChange={set("otherHalfImage")}
              placeholder="https://..."
            />
          </Field>

          {profile.otherHalfImage && (
            <div className="mb-4 flex justify-center rounded-lg border border-line bg-void p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.otherHalfImage} alt="Preview" className="max-h-40 w-auto" />
            </div>
          )}

          <Field label="Description">
            <TextArea
              value={profile.otherHalfDescription || ""}
              onChange={set("otherHalfDescription")}
              placeholder="Why this character resonates with you..."
            />
          </Field>
        </div>

        <div className="mt-5">
          <PrimaryButton type="submit" icon={Check} disabled={saving}>
            {saving ? "Saving…" : "Save profile"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
