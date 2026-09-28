"use client";

import { motion } from "motion/react";
import { site } from "@/lib/data";
import { Console } from "./Console";
import { Button } from "./ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const facts = [
  { k: "Now", v: "ICT Manager, Chris Makinde & Co" },
  { k: "Degree", v: "B.Sc. Computer Science" },
  { k: "Based", v: site.location },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate pt-28 pb-16 sm:pt-36 lg:pb-24">
      {/* Grid fades out toward the edges so it reads as texture, not decoration. */}
      <div
        aria-hidden="true"
        className="grid-paper absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_35%,black,transparent)]"
      />

      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7 lg:pt-4">
          <motion.p
            variants={item}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wide text-muted"
          >
            <span className="status-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>Currently building</span>
            <span aria-hidden="true" className="text-faint">
              →
            </span>
            <span className="text-fg">IT Support + Cybersecurity</span>
          </motion.p>

          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.75rem,9vw,5.25rem)] leading-[0.98] font-semibold tracking-[-0.04em]"
          >
            <motion.span variants={item} className="block">
              IT Support.
            </motion.span>
            <motion.span variants={item} className="block">
              Systems.
            </motion.span>
            <motion.span variants={item} className="relative inline-block">
              <span className="font-serif font-normal tracking-[-0.02em] text-accent">Security.</span>
              <span className="absolute top-2 left-full ml-3 hidden font-mono text-[0.6875rem] font-normal tracking-normal whitespace-nowrap text-faint sm:block">
                ← in progress
              </span>
            </motion.span>
          </h1>

          <motion.p variants={item} className="mt-7 max-w-[34rem] text-lg leading-relaxed text-pretty text-muted">
            I work with technology from the practical side — supporting users, troubleshooting systems, keeping a
            small office network honest — and I&rsquo;m building, step by step, toward a career in cybersecurity.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Button href="#projects" arrow="down">
              View my work
            </Button>
            <Button href="#contact" variant="ghost" arrow="right">
              Let&rsquo;s connect
            </Button>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5 lg:pt-10">
          <Console />
        </div>
      </div>

      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="shell mt-16 grid gap-px sm:mt-20 sm:grid-cols-3"
      >
        {facts.map((f) => (
          <div key={f.k} className="border-t border-line pt-4 sm:pr-6">
            <dt className="font-mono text-[0.6875rem] tracking-wider text-faint uppercase">{f.k}</dt>
            <dd className="mt-1 text-sm text-fg">{f.v}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
