import { ProjectCard } from "./ProjectCard";

export function Work({ projects }) {
  return (
    <section id="work" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <span className="font-mono text-xs text-blue-2">SELECTED WORK</span>
          <h2 className="mt-1.5 font-display text-[28px] font-semibold text-text">Projects &amp; builds</h2>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-[14px] border border-dashed border-line px-6 py-12 text-center font-body text-sm text-muted">
            No projects published yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
