"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { design, designList as designProjects, type DesignProject } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";

const L = design.labels;

export function DesignWork() {
  if (designProjects.length === 0) return null;
  return <DesignGrid />;
}

function DesignGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const open = (i: number, trigger: HTMLButtonElement | null) => {
    lastTrigger.current = trigger;
    setOpenIndex(i);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    dialog.scrollTo({ top: 0 });
  }, [openIndex]);

  const onClose = () => {
    document.body.style.overflow = "";
    setOpenIndex(null);
    lastTrigger.current?.focus();
  };

  return (
    <section id="design" aria-labelledby="design-title" className="border-t border-line py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="design-title"
            index="06"
            label={design.label}
            title={design.title}
            lede={design.lede}
          />
          {design.behance ? (
            <a
              href={design.behance}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center font-mono text-xs text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
            >
              {design.behanceLabel}
            </a>
          ) : (
            design.behancePending && <p className="font-mono text-xs text-faint">{design.behancePending}</p>
          )}
        </div>

        <ul className="mt-14 grid gap-x-5 gap-y-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {designProjects.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 ? "sm:col-span-2 lg:row-span-2" : undefined}
            >
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                aria-haspopup="dialog"
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[808/632] overflow-hidden rounded-[3px] border border-line bg-raised">
                  {p.cover && (
                    <Image
                      src={p.cover}
                      alt={`${p.title} — ${p.category}, cover`}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  )}
                  <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-bg/90 px-4 py-2.5 font-mono text-[0.6875rem] text-fg backdrop-blur transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                    <span>{L.open}</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </span>
                <span className="mt-3.5 flex items-baseline justify-between gap-4">
                  <span className="min-w-0">
                    <span
                      className={`block font-display font-semibold tracking-tight transition-colors group-hover:text-accent ${
                        i === 0 ? "text-xl sm:text-2xl" : "text-lg"
                      }`}
                    >
                      {p.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{p.category}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-faint">{p.year}</span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={onClose}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        aria-labelledby="case-title"
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-bg p-0 text-fg backdrop:bg-black/80 sm:m-auto sm:h-[calc(100dvh-3rem)] sm:w-[min(100vw-3rem,64rem)] sm:rounded-md sm:border sm:border-line-strong"
      >
        {openIndex !== null && (
          <CaseStudy
            project={designProjects[openIndex]}
            onClose={() => dialogRef.current?.close()}
            onNext={() => setOpenIndex((openIndex + 1) % designProjects.length)}
            next={designProjects[(openIndex + 1) % designProjects.length]}
          />
        )}
      </dialog>
    </section>
  );
}

function CaseStudy({
  project: p,
  onClose,
  onNext,
  next,
}: {
  project: DesignProject;
  onClose: () => void;
  onNext: () => void;
  next: DesignProject;
}) {
  const meta = [
    { k: L.role, v: p.role },
    { k: L.type, v: p.type },
    { k: L.tools, v: p.tools },
    { k: L.year, v: p.year },
  ].filter((m) => m.v);
  const story = [
    { k: L.challenge, v: p.challenge },
    { k: L.approach, v: p.approach },
    { k: L.outcome, v: p.outcome },
  ].filter((s) => s.v);

  return (
    <article>
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur sm:px-8">
        <p className="min-w-0 truncate font-mono text-xs text-muted">
          <span className="text-accent">{L.caseStudy}</span> / {p.slug}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-[3px] border border-line-strong px-3 font-mono text-xs text-muted transition-colors hover:border-fg hover:text-fg"
        >
          {L.close} <span aria-hidden="true">esc</span>
        </button>
      </div>

      <header className="px-4 pt-10 pb-8 sm:px-8 sm:pt-14">
        <p className="font-mono text-xs tracking-wider text-faint uppercase">{p.category}</p>
        <h3 id="case-title" className="mt-3 font-display text-[clamp(2rem,6vw,3.25rem)] leading-none font-semibold tracking-[-0.03em]">
          {p.title}
        </h3>
        {p.tagline && <p className="mt-4 max-w-2xl text-lg text-pretty text-muted">{p.tagline}</p>}
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
          {meta.map((m, i) => (
            <div key={i}>
              <dt className="font-mono text-[0.6875rem] tracking-wider text-faint uppercase">{m.k}</dt>
              <dd className="mt-1 text-sm">{m.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="grid gap-8 px-4 pb-10 sm:px-8 md:grid-cols-3">
        {story.map((st, i) => (
          <section key={i} aria-label={st.k}>
            <p className="font-mono text-xs text-accent">0{i + 1}</p>
            <h4 className="mt-1 font-display text-lg font-semibold tracking-tight">{st.k}</h4>
            <p className="mt-2 text-[0.9375rem] text-pretty text-muted">{st.v}</p>
          </section>
        ))}
      </div>

      {p.decisions.length > 0 && (
      <div className="mx-4 border-t border-line pt-8 pb-12 sm:mx-8">
        <p className="font-mono text-xs tracking-wider text-faint uppercase">{L.decisions}</p>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line md:grid-cols-3">
          {p.decisions.map((d, i) => (
            <li key={i} className="bg-bg p-5">
              <p className="font-display font-semibold tracking-tight">{d.title}</p>
              <p className="mt-1.5 text-sm text-muted">{d.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      )}

      <div className="space-y-6 px-4 pb-12 sm:px-8">
        {p.slides.filter((sl) => sl.image).map((sl, i) => (
          <figure key={i}>
            <div className="overflow-hidden rounded-[3px] border border-line">
              <Image
                src={sl.image!}
                alt={`${p.title} — ${sl.caption}`}
                width={sl.width || 1600}
                height={sl.height || 1000}
                sizes="(min-width: 1024px) 960px, 100vw"
                className="h-auto w-full"
              />
            </div>
            {sl.caption && <figcaption className="mt-2 font-mono text-xs text-faint">{sl.caption}</figcaption>}
          </figure>
        ))}
      </div>

      <footer className="border-t border-line px-4 py-8 sm:px-8">
        <button type="button" onClick={onNext} className="group flex w-full items-center justify-between gap-4 text-left">
          <span>
            <span className="block font-mono text-xs text-faint">{L.next}</span>
            <span className="mt-1 block font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </span>
          <span aria-hidden="true" className="font-mono text-lg transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </footer>
    </article>
  );
}
