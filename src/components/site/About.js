import { Tag } from "@/components/ui/Field";

export function About({ profile }) {
  const { otherHalfName, otherHalfImage, otherHalfDescription } = profile;
  const showOtherHalf = otherHalfName && otherHalfImage && otherHalfDescription;

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

        {showOtherHalf && (
          <div className="mt-16 border-t border-line/60 pt-14">
            <div className="grid items-center gap-10 sm:grid-cols-5">
              <div className="relative flex justify-center sm:col-span-2">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-[280px] w-[280px] rounded-full blur-[60px]"
                  style={{ background: "radial-gradient(circle, var(--color-blue-dim) 0%, transparent 70%)" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={otherHalfImage}
                  alt={otherHalfName}
                  className="relative max-h-[340px] w-auto drop-shadow-[0_20px_40px_rgba(59,108,255,0.25)]"
                />
              </div>
              <div className="sm:col-span-3">
                <span className="font-mono text-xs text-blue-2">MY OTHER HALF</span>
                <h3 className="mb-4 mt-1.5 font-display text-[22px] font-semibold text-text">{otherHalfName}</h3>
                <p className="font-body text-[15.5px] leading-[1.75] text-muted">{otherHalfDescription}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
