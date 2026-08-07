"use client";

import { Check, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { PrimaryButton } from "@/components/ui/Button";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { StatusBadge } from "@/components/site/ProjectCard";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // "new" | project object | null
  const [flash, setFlash] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  function showFlash(msg) {
    setFlash(msg);
    setTimeout(() => setFlash(""), 1800);
  }

  function handleSaved(project) {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === project.id);
      return exists ? prev.map((p) => (p.id === project.id ? project : p)) : [project, ...prev];
    });
    setEditing(null);
    showFlash("Project published to your portfolio.");
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this project? This can't be undone.")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showFlash("Project removed.");
    }
  }

  return (
    <div>
      {flash && (
        <div className="mb-[18px] inline-flex items-center gap-2 rounded-lg border border-blue/30 bg-blue/10 px-3.5 py-[9px] font-body text-[13px] text-blue-2">
          <Check size={14} /> {flash}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-[22px] font-semibold text-text">Projects</h2>
        {editing !== "new" && (
          <PrimaryButton icon={Plus} onClick={() => setEditing("new")}>
            New project
          </PrimaryButton>
        )}
      </div>

      {editing === "new" && <ProjectForm onSaved={handleSaved} onCancel={() => setEditing(null)} />}
      {editing && editing !== "new" && (
        <ProjectForm initial={editing} onSaved={handleSaved} onCancel={() => setEditing(null)} />
      )}

      {loading ? (
        <p className="font-body text-sm text-muted">Loading…</p>
      ) : projects.length === 0 && !editing ? (
        <p className="font-body text-sm text-muted">No projects yet — add your first one above.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-3 rounded-[10px] border border-line bg-surface px-4 py-[14px]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-[14.5px] font-semibold text-text">{p.title}</span>
                  {p.featured && <Star size={12} className="text-blue-2" fill="currentColor" />}
                </div>
                <p className="mt-0.5 truncate font-body text-[12.5px] text-muted">{p.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => setEditing(p)}
                  className="rounded-md p-1.5 text-muted transition-colors hover:text-text"
                  aria-label="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="rounded-md p-1.5 text-danger transition-colors hover:opacity-80"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
