"use client";

import { useState } from "react";
import { Field, TextInput } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (form.next.length < 4) {
      setError("New password must be at least 4 characters.");
      return;
    }
    if (form.next !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not update the password.");
        return;
      }
      setForm({ current: "", next: "", confirm: "" });
      setFlash("Password changed.");
      setTimeout(() => setFlash(""), 1800);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2 className="mb-[18px] font-display text-[22px] font-semibold text-text">Settings</h2>

      <div className="max-w-[420px] rounded-xl border border-line bg-surface p-5">
        <h3 className="mb-3.5 font-display text-[15px] font-semibold text-text">Change admin password</h3>
        <form onSubmit={submit}>
          <Field label="Current password">
            <TextInput
              type="password"
              value={form.current}
              onChange={(e) => setForm({ ...form, current: e.target.value })}
            />
          </Field>
          <Field label="New password">
            <TextInput
              type="password"
              value={form.next}
              onChange={(e) => setForm({ ...form, next: e.target.value })}
            />
          </Field>
          <Field label="Confirm new password">
            <TextInput
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
          </Field>

          {error && <p className="mb-3 font-body text-[13px] text-danger">{error}</p>}
          {flash && <p className="mb-3 font-body text-[13px] text-blue-2">{flash}</p>}

          <PrimaryButton type="submit" disabled={saving}>
            {saving ? "Updating…" : "Update password"}
          </PrimaryButton>
        </form>
      </div>

      <p className="mt-4 max-w-[420px] font-body text-[12.5px] leading-relaxed text-muted">
        This admin panel uses simple password gating suited for a personal portfolio. It isn&apos;t
        bank-grade security — don&apos;t reuse a sensitive password here.
      </p>
    </div>
  );
}
