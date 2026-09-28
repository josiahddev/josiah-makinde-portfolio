import type { Project } from "@/lib/data";
import { PAR, RepoLink } from "./ProjectCard";
import { ProjectGallery } from "./ProjectGallery";
import { StatusBadge } from "./StatusBadge";
import { Reveal } from "./ui/Reveal";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`${project.slug}-title`} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <Reveal className="min-w-0 lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
        <ProjectGallery images={project.images} title={project.title} />
      </Reveal>

      <Reveal variant="fade" delay={0.1} className="min-w-0 lg:col-span-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-faint">{project.index}</span>
          <StatusBadge status={project.status} />
          <span className="font-mono text-[0.6875rem] tracking-wider text-faint uppercase">Featured</span>
        </div>
        <h3
          id={`${project.slug}-title`}
          className="mt-4 font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight font-semibold tracking-tight"
        >
          {project.title}
        </h3>
        <p className="mt-3 text-pretty text-muted">{project.summary}</p>

        <PAR project={project} />

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
          {project.stack.map((s) => (
            <li key={s} className="rounded-[2px] border border-line px-2 py-1 font-mono text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>

        <RepoLink repo={project.repo} />
      </Reveal>
    </article>
  );
}
