import { Tag } from "@/components/ui/Field";

export function About({ profile }) {
  return (
    <section id="about" className="border-t border-line px-6 py-20">
      <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-5">
        <div className="sm:col-span-3">
          <span className="font-mono text-xs text-blue-2">ABOUT</span>
          <h2 className="mb-4 mt-1.5 font-display text-[26px] font-semibold text-text">A little about me</h2>
          <p className="font-body text-[15.5px] leading-[1.75] text-muted">{profile.about}</p>
          {profile.location && (
            <p className="mt-[18px] font-mono text-xs text-muted">📍 {profile.location}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <span className="font-mono text-xs text-blue-2">STACK</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {(profile.skills || []).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
