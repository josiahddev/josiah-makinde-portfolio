"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { skillGroups, skillLevelLabel, type SkillGroup, type SkillLevel } from "@/lib/data";

/** Shape + text carry the level, so it never depends on colour alone. */
function LevelMark({ level }: { level: SkillLevel }) {
  const shape = {
    daily: "bg-accent border-accent",
    working: "border-accent bg-[linear-gradient(90deg,var(--color-accent)_50%,transparent_50%)]",
    learning: "border-muted border-dashed",
  }[level];
  return <span aria-hidden="true" className={`inline-block size-2.5 shrink-0 rounded-[1px] border ${shape}`} />;
}

export function Skills() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0, 1]));
  const allOpen = open.size === skillGroups.length;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <p className="flex items-center gap-3 font-mono text-xs tracking-wider text-faint uppercase">
              <span className="text-accent">04</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              Skills
            </p>
            <h2
              id="skills-title"
              className="mt-5 font-display text-[clamp(1.875rem,4.2vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance"
            >
              Labelled honestly.
            </h2>
            <p className="mt-4 max-w-sm text-pretty text-muted">
              No percentage bars. Each group says whether I use it at work, know it well enough to get by, or am
              still learning it.
            </p>

            <ul className="mt-8 space-y-2.5 font-mono text-xs text-muted">
              {(Object.keys(skillLevelLabel) as SkillLevel[]).map((l) => (
                <li key={l} className="flex items-center gap-3">
                  <LevelMark level={l} />
                  {skillLevelLabel[l]}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(allOpen ? new Set() : new Set(skillGroups.map((_, i) => i)))}
              className="min-h-11 font-mono text-xs text-faint transition-colors hover:text-fg"
            >
              {allOpen ? "[ collapse all ]" : "[ expand all ]"}
            </button>
          </div>
          <ul className="border-t border-line">
            {skillGroups.map((g, i) => (
              <SkillGroupRow key={g.name} group={g} index={i} isOpen={open.has(i)} onToggle={() => toggle(i)} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SkillGroupRow({
  group,
  index,
  isOpen,
  onToggle,
}: {
  group: SkillGroup;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `skills-panel-${index}`;
  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center gap-4 py-5 text-left"
        >
          <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex-1">
            <span className="block font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
              {group.name}
            </span>
            <span className="mt-0.5 block text-sm text-muted">{group.summary}</span>
          </span>
          <span className="hidden items-center gap-2 font-mono text-[0.6875rem] tracking-wide text-muted uppercase sm:flex">
            <LevelMark level={group.level} />
            {skillLevelLabel[group.level]}
          </span>
          <span
            aria-hidden="true"
            className={`font-mono text-faint transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 sm:pl-9">
              <p className="mb-3 flex items-center gap-2 font-mono text-[0.6875rem] tracking-wide text-muted uppercase sm:hidden">
                <LevelMark level={group.level} />
                {skillLevelLabel[group.level]}
              </p>
              <ul className="flex flex-wrap gap-x-1 gap-y-2 text-[0.9375rem] text-fg">
                {group.items.map((s, i) => (
                  <li key={s}>
                    {s}
                    {i < group.items.length - 1 && (
                      <span aria-hidden="true" className="px-2 text-line-strong">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
