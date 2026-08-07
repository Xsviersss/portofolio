import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { getProject, getProfile } from "@/lib/db";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { StatusBadge } from "@/components/site/ProjectCard";
import { Tag } from "@/components/ui/Field";

export const dynamic = "force-dynamic";

function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
  } catch {
    return null;
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Project`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const [project, profile] = await Promise.all([getProject(id), getProfile()]);

  if (!project) notFound();

  const youtubeEmbed = getYoutubeEmbedUrl(project.video);

  return (
    <>
      <Nav />

      <main className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#work"
            className="mb-8 inline-flex items-center gap-1.5 font-body text-sm text-muted transition-colors hover:text-text"
          >
            <ArrowLeft size={15} /> Back to work
          </Link>

          {(project.video || project.image) && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-line bg-surface">
              {youtubeEmbed ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={youtubeEmbed}
                    title={project.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : project.video ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={project.video} controls className="max-h-[480px] w-full" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} className="max-h-[480px] w-full object-cover" />
              )}
            </div>
          )}

          <div className="mb-4 flex flex-wrap items-center gap-2">
            {project.status && <StatusBadge status={project.status} />}
            {project.year && <span className="font-mono text-[11px] text-muted">{project.year}</span>}
          </div>

          <h1 className="mb-5 font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-text">
            {project.title}
          </h1>

          <p className="font-body text-[16px] leading-[1.8] text-muted">{project.description}</p>

          {project.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-8 flex items-center gap-6 border-t border-line pt-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm text-blue-2"
                >
                  Visit live <ArrowUpRight size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-sm text-muted"
                >
                  <Github size={14} /> View code
                </a>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}