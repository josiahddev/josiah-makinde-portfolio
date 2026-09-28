"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Project } from "@/lib/data";
import { ProjectGallery } from "./ProjectGallery";
import { StatusBadge } from "./StatusBadge";
import { GitHubIcon } from "./ui/icons";

const PENDING = "More details coming soon.";

/** Compact, expandable row for the non-featured projects. */
export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const panelId = `project-${project.slug}`;

  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-start gap-x-3 gap-y-2 py-7 text-left sm:grid-cols-[3rem_1fr_auto] sm:items-center"
        >
          <span className="pt-1 font-mono text-sm text-faint transition-colors group-hover:text-accent sm:pt-0">
            {project.index}
          </span>
          <span className="min-w-0">
            <span className="block font-display text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
              {project.title}
            </span>
            <span className="mt-1 block text-sm text-muted">{project.stack.join(" · ")}</span>
          </span>
          <span className="flex items-center gap-4">
            <span className="hidden sm:inline">
              <StatusBadge status={project.status} />
            </span>
            <span
              aria-hidden="true"
              className={`font-mono text-lg text-faint transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            >
              +
            </span>
          </span>
          <span className="col-start-2 sm:hidden">
            <StatusBadge status={project.status} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-10 sm:pl-[3.75rem] lg:grid-cols-2 lg:gap-12">
              <div className="min-w-0">
                <p className="text-pretty text-muted">{project.summary}</p>
                <PAR project={project} />
                {project.components && (
                  <div className="mt-8">
                    <p className="font-mono text-xs tracking-wider text-faint uppercase">Components</p>
                    <ul className="mt-3 divide-y divide-line border-y border-line">
                      {project.components.map((c) => (
                        <li key={c.name} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                          {c.name}
                          <StatusBadge status={c.status} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <RepoLink repo={project.repo} />
              </div>
              <div className="min-w-0">
                <ProjectGallery images={project.images} title={project.title} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Problem → Approach → Result, with an honest placeholder for anything not written up yet. */
export function PAR({ project }: { project: Project }) {
  const steps = [
    { k: "Problem", v: project.problem },
    { k: "Approach", v: project.approach },
    { k: "Result", v: project.result },
  ];
  return (
    <dl className="mt-6 space-y-5">
      {steps.map((s, i) => (
        <div key={s.k} className="grid gap-1.5 sm:grid-cols-[6.5rem_1fr] sm:gap-3">
          <dt className="pt-0.5 font-mono text-xs tracking-wide text-faint uppercase">
            <span className="text-accent">{i + 1}.</span> {s.k}
          </dt>
          <dd className={`text-[0.9375rem] text-pretty ${s.v ? "text-fg/90" : "text-faint italic"}`}>{s.v ?? PENDING}</dd>
        </div>
      ))}
    </dl>
  );
}

export function RepoLink({ repo }: { repo: string | null }) {
  if (!repo)
    return <p className="mt-8 font-mono text-xs text-faint">GitHub link coming soon</p>;
  return (
    <a
      href={repo}
      target="_blank"
      rel="noreferrer"
      className="group mt-8 inline-flex min-h-11 items-center gap-2.5 text-sm text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
    >
      <GitHubIcon className="size-4" />
      View the code on GitHub
      <span aria-hidden="true" className="font-mono text-xs transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        ↗
      </span>
    </a>
  );
}
