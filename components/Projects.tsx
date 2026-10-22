import { contact, projectList, projects, security } from "@/lib/content";
import { FeaturedProject } from "./FeaturedProject";
import { LabLog } from "./LabLog";
import { ProjectCard } from "./ProjectCard";
import { SecurityAssessment } from "./SecurityAssessment";
import { SectionHeading } from "./ui/SectionHeading";

export function Projects() {
  const [featured, ...rest] = projectList;
  const earlier = projects.earlier.filter((w) => w.name);

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="projects-title"
            index="05"
            label={projects.label}
            title={projects.title}
            lede={projects.lede}
          />
          {contact.github && contact.githubHandle && (
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center font-mono text-xs text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
            >
              github.com/{contact.githubHandle} ↗
            </a>
          )}
        </div>

        {security.show && (
          <div className="mt-14 sm:mt-20">
            <SecurityAssessment />
          </div>
        )}

        {featured && (
          <div className="mt-20 sm:mt-28">
            <FeaturedProject project={featured} />
          </div>
        )}

        {rest.length > 0 && (
          <ul className="mt-20 border-t border-line sm:mt-28">
            {rest.map((p) => (
              <ProjectCard key={p.slug + p.index} project={p} />
            ))}
          </ul>
        )}

        <LabLog />

        {earlier.length > 0 && (
          <div className="mt-20 grid gap-4 sm:grid-cols-[12rem_1fr]">
            <p className="font-mono text-xs tracking-wider text-faint uppercase">{projects.earlierLabel}</p>
            <ul className="flex flex-col text-sm">
              {earlier.map((w, i) => (
                <li key={i}>
                  {w.href ? (
                    <a
                      href={w.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block py-1.5 text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                    >
                      {w.name}
                    </a>
                  ) : (
                    <span className="inline-block py-1.5 text-fg">{w.name}</span>
                  )}
                  {w.note && <span className="text-muted"> — {w.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
