"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Field, TextInput } from "@/components/ui/Field";
import { PrimaryButton } from "@/components/ui/Button";
import { DEFAULT_PASSWORD } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong.");
        return;
      }
      router.push("/admin/projects");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-6">
      <div className="w-full max-w-[380px] rounded-[14px] border border-line bg-surface p-7">
        <div className="mb-6 flex items-center gap-2">
          <ShieldCheck size={18} className="text-blue-2" />
          <span className="font-display text-base font-semibold text-text">Admin access</span>
        </div>

        <form onSubmit={submit}>
          <Field label="Password">
            <div className="relative">
              <TextInput
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="pr-9"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-2.5 top-2 text-muted"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </Field>

          {error && <p className="mb-3 font-body text-[13px] text-danger">{error}</p>}

          <PrimaryButton type="submit" disabled={loading} className="w-full justify-center">
            {loading ? "Checking…" : "Enter dashboard"}
          </PrimaryButton>
        </form>

        <p className="mt-[18px] font-mono text-[11px] leading-relaxed text-muted">
          Authorized Access only.
        </p>
      </div>
    </div>
  );
}
