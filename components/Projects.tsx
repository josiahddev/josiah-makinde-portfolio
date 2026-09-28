import { contact, earlierWork, projects } from "@/lib/data";
import { FeaturedProject } from "./FeaturedProject";
import { LabLog } from "./LabLog";
import { SecurityAssessment } from "./SecurityAssessment";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./ui/SectionHeading";

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="projects-title"
            index="05"
            label="Projects"
            title="Built, tested, written up."
            lede="Lab work and personal projects, not commercial products — a group security assessment, the small tools I build to learn, and the networking labs behind them."
          />
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center font-mono text-xs text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            github.com/{contact.githubHandle} ↗
          </a>
        </div>

        <div className="mt-14 sm:mt-20">
          <SecurityAssessment />
        </div>

        <div className="mt-20 sm:mt-28">
          <FeaturedProject project={featured} />
        </div>

        <ul className="mt-20 border-t border-line sm:mt-28">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </ul>

        <LabLog />

        <div className="mt-20 grid gap-4 sm:grid-cols-[12rem_1fr]">
          <p className="font-mono text-xs tracking-wider text-faint uppercase">Earlier web practice</p>
          <ul className="flex flex-col text-sm">
            {earlierWork.map((w) => (
              <li key={w.name}>
                <a
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block py-1.5 text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {w.name}
                </a>
                <span className="text-muted"> — {w.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
