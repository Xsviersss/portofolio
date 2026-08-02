import { Github, Youtube, Mail } from "lucide-react";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";

export function Contact({ profile }) {
  const socials = [
  profile.github && { icon: Github, href: profile.github, label: "GitHub" },
  profile.youtube && { icon: Youtube, href: profile.youtube, label: "YouTube" },
].filter(Boolean);

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line px-6 py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 100%, var(--color-blue-dim), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-5xl text-center">
        <span className="font-mono text-xs text-blue-2">GET IN TOUCH</span>
        <h2 className="mb-[26px] mt-2.5 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-text">
          Need something spesific? Contact me.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${profile.email}`}>
            <PrimaryButton icon={Mail}>{profile.email}</PrimaryButton>
          </a>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              <GhostButton icon={s.icon}>{s.label}</GhostButton>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
