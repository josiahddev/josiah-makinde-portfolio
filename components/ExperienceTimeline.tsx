"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { nowBuilding, timeline, type TimelineEntry } from "@/lib/data";
import { SectionHeading } from "./ui/SectionHeading";

const kindLabel: Record<TimelineEntry["kind"], string> = {
  work: "Work",
  education: "Education",
  now: "Current",
};

export function ExperienceTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="experience-title"
          index="02"
          label="Experience"
          title="Keeping other people's computers working, since 2021."
          lede="Most recent first. Every role here has been hands-on support — the people, the machines and the network between them."
        />

        <ol ref={listRef} className="relative mt-16 sm:mt-20">
          {/* Track + scroll-driven fill */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line md:left-[11.5rem]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent md:left-[11.5rem]"
          />

          {timeline.map((entry) => (
            <TimelineItem key={entry.period + entry.org} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const [lit, setLit] = useState(false);
  const isNow = entry.kind === "now";

  return (
    <motion.li
      onViewportEnter={() => setLit(true)}
      viewport={{ once: true, margin: "0px 0px -35% 0px" }}
      className="relative grid pb-14 pl-8 last:pb-0 md:grid-cols-[11.5rem_1fr] md:pl-0"
    >
      {/* Period column (desktop) */}
      <div className="hidden pt-0.5 pr-10 text-right md:block">
        <p className={`font-mono text-sm transition-colors duration-500 ${lit ? "text-fg" : "text-faint"}`}>
          {entry.period}
        </p>
        <p className="mt-1 font-mono text-[0.6875rem] tracking-wider text-faint uppercase">{kindLabel[entry.kind]}</p>
      </div>

      {/* Node */}
      <span
        aria-hidden="true"
        className={`absolute top-1.5 left-0 size-[11px] rounded-full border transition-all duration-500 md:left-[calc(11.5rem-5px)] ${
          lit ? "border-accent bg-accent" : "border-line-strong bg-bg"
        } ${isNow && lit ? "status-dot" : ""}`}
      />

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="md:pl-10"
      >
        <p className="font-mono text-xs text-faint md:hidden">
          {entry.period} · {kindLabel[entry.kind]}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight md:mt-0">{entry.role}</h3>
        <p className="mt-0.5 text-muted">
          {entry.org}
          <span className="text-faint"> — {entry.place}</span>
        </p>
        {entry.note && <p className="mt-2 font-mono text-xs text-accent">{entry.note}</p>}

        {entry.points.length > 0 && (
          <ul className="mt-5 max-w-2xl space-y-2.5 text-[0.9375rem] text-muted">
            {entry.points.map((p) => (
              <li key={p} className="relative pl-5">
                <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-line-strong" />
                {p}
              </li>
            ))}
          </ul>
        )}

        {isNow && (
          <ul className="mt-5 flex max-w-2xl flex-wrap gap-2" aria-label="Skills currently being built">
            {nowBuilding.map((s) => (
              <li key={s} className="rounded-[2px] border border-line px-2 py-1 font-mono text-xs text-muted">
                {s}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.li>
  );
}
