import { ArrowRight, Mail } from "lucide-react";
import { PrimaryButton, GhostButton } from "@/components/ui/Button";
import { Atmosphere } from "./Atmosphere";

export function Hero({ profile }) {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-28 pt-24 sm:pb-36 sm:pt-32">
      <Atmosphere />
      <div className="relative z-[1] mx-auto max-w-5xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
          <span className="font-mono text-xs text-muted">{profile.heroNote}</span>
        </div>

        <h1 className="max-w-[820px] font-display text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.05] tracking-tight text-text">
          {profile.name} — <span className="text-blue-2">{profile.role}</span>
        </h1>

        <p className="mt-[22px] max-w-[560px] font-body text-lg leading-relaxed text-muted">{profile.tagline}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#work">
            <PrimaryButton icon={ArrowRight}>View work</PrimaryButton>
          </a>
          <a href="#contact">
            <GhostButton icon={Mail}>Get in touch</GhostButton>
          </a>
        </div>
      </div>
    </section>
  );
}
