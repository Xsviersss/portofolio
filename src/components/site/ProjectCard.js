import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Tag } from "@/components/ui/Field";
import { PROJECT_STATUSES } from "@/lib/constants";

export function StatusBadge({ status }) {
  const s = PROJECT_STATUSES[status] || PROJECT_STATUSES.released;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide"
      style={{ borderColor: `${s.color}44`, background: `${s.color}18`, color: s.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  );
}

export function ProjectCard({ project }) {
  const initial = (project.title || "?").charAt(0).toUpperCase();

  return (
    <Link
      href={`/work/${project.id}`}
      className="group flex flex-col gap-3.5 rounded-[14px] border border-line bg-surface p-[22px] transition-all hover:-translate-y-0.5 hover:border-blue/40"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-gradient-to-br from-blue to-blue-dim font-display text-[15px] font-bold text-white">
          {initial}
        </div>
        <div className="flex items-center gap-2">
          {project.status && <StatusBadge status={project.status} />}
          {project.featured && (
            <span title="Featured" className="text-blue-2">
              <Star size={14} fill="currentColor" />
            </span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-display text-[17px] font-semibold text-text">{project.title}</h3>
          {project.year && <span className="font-mono text-[11px] text-muted">{project.year}</span>}
        </div>
        <p className="mt-1.5 font-body text-sm leading-relaxed text-muted">{project.description}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {(project.tags || []).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <span className="inline-flex items-center gap-1 pt-0.5 font-body text-[13px] text-blue-2">
        View project
        <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}