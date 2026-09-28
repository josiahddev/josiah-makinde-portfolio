"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { learningTracks, stepStateLabel, type StepState } from "@/lib/data";
import { SectionHeading } from "./ui/SectionHeading";

const nodeStyle: Record<StepState, string> = {
  done: "border-fg bg-fg",
  current: "border-accent bg-accent status-dot",
  next: "border-muted border-dashed bg-bg",
};

export function LearningJourney({ children }: { children?: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const track = learningTracks[active];

  // Arrow-key navigation between tabs, per the WAI-ARIA tabs pattern.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (active + dir + learningTracks.length) % learningTracks.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="learning" aria-labelledby="learning-title" className="border-t border-line bg-raised/40 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="learning-title"
          index="07"
          label="Learning"
          title="Where I'm heading, one layer at a time."
          lede="Security sits on top of networking and systems, so that's the order I'm learning them in. No percentages — just what's covered, what I'm on now, and what's next."
        />

        <div className="mt-14">
          <div role="tablist" aria-label="Learning tracks" className="flex gap-1 border-b border-line" onKeyDown={onKeyDown}>
            {learningTracks.map((t, i) => (
              <button
                key={t.name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`track-tab-${i}`}
                aria-selected={i === active}
                aria-controls="track-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative min-h-11 shrink-0 px-2.5 pb-3 text-sm transition-colors sm:px-5 sm:text-base ${
                  i === active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                <span className="mr-2 hidden font-mono text-xs text-faint sm:inline">{String(i + 1).padStart(2, "0")}</span>
                {t.name}
                {i === active && (
                  <motion.span
                    layoutId="track-underline"
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div
            id="track-panel"
            role="tabpanel"
            aria-labelledby={`track-tab-${active}`}
            tabIndex={0}
            className="pt-10 focus-visible:outline-offset-8"
          >
            <p className="max-w-xl text-muted">{track.why}</p>

            <ol key={track.name} className="relative mt-10 grid gap-0 md:grid-flow-col md:auto-cols-fr">
              {track.steps.map((step, i) => (
                <motion.li
                  key={step.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-4 pb-8 md:block md:pr-6 md:pb-0"
                >
                  {/* connector: vertical on mobile, horizontal on desktop */}
                  {i < track.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`absolute top-3 left-[5px] h-full w-px md:top-[5px] md:left-3 md:h-px md:w-full ${
                        step.state === "done" ? "bg-fg/60" : "bg-line-strong"
                      }`}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`relative z-10 mt-1.5 block size-[11px] shrink-0 rounded-full border md:mt-0 ${nodeStyle[step.state]}`}
                  />
                  <div className="md:mt-5">
                    <p
                      className={`font-mono text-[0.6875rem] tracking-wider uppercase ${
                        step.state === "current" ? "text-accent" : "text-faint"
                      }`}
                    >
                      {stepStateLabel[step.state]}
                    </p>
                    <p className={`mt-1 font-display text-lg font-medium tracking-tight ${step.state === "next" ? "text-muted" : ""}`}>
                      {step.label}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
