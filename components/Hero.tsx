"use client";

import { motion } from "motion/react";
import { hero } from "@/lib/content";
import { Console } from "./Console";
import { Button } from "./ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Hero() {
  const facts = hero.facts.filter((f) => f.label && f.value);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate pt-28 pb-16 sm:pt-36 lg:pb-24">
      {/* Grid fades out toward the edges so it reads as texture, not decoration. */}
      <div
        aria-hidden="true"
        className="grid-paper absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_35%,black,transparent)]"
      />

      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7 lg:pt-4">
          {(hero.statusLabel || hero.statusValue) && (
            <motion.p
              variants={item}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wide text-muted"
            >
              <span className="status-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {hero.statusLabel && <span>{hero.statusLabel}</span>}
              {hero.statusLabel && hero.statusValue && (
                <span aria-hidden="true" className="text-faint">
                  →
                </span>
              )}
              {hero.statusValue && <span className="text-fg">{hero.statusValue}</span>}
            </motion.p>
          )}

          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.75rem,9vw,5.25rem)] leading-[0.98] font-semibold tracking-[-0.04em]"
          >
            {hero.headline.map((line, i) => (
              <motion.span key={i} variants={item} className="block">
                {line}
              </motion.span>
            ))}
            {hero.headlineAccent && (
              <motion.span variants={item} className="relative inline-block">
                <span className="font-serif font-normal tracking-[-0.02em] text-accent">{hero.headlineAccent}</span>
                {hero.annotation && (
                  <span className="absolute top-2 left-full ml-3 hidden font-mono text-[0.6875rem] font-normal tracking-normal whitespace-nowrap text-faint sm:block">
                    {hero.annotation}
                  </span>
                )}
              </motion.span>
            )}
          </h1>

          {hero.intro && (
            <motion.p variants={item} className="mt-7 max-w-[34rem] text-lg leading-relaxed text-pretty text-muted">
              {hero.intro}
            </motion.p>
          )}

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            {hero.primaryCta && (
              <Button href="#projects" arrow="down">
                {hero.primaryCta}
              </Button>
            )}
            {hero.secondaryCta && (
              <Button href="#contact" variant="ghost" arrow="right">
                {hero.secondaryCta}
              </Button>
            )}
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5 lg:pt-10">
          <Console />
        </div>
      </div>

      {facts.length > 0 && (
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="shell mt-16 grid gap-px sm:mt-20 sm:grid-cols-3"
        >
          {facts.map((f) => (
            <div key={f.label} className="border-t border-line pt-4 sm:pr-6">
              <dt className="font-mono text-[0.6875rem] tracking-wider text-faint uppercase">{f.label}</dt>
              <dd className="mt-1 text-sm text-fg">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      )}
    </section>
  );
}
