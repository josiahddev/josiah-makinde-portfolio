"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { hero } from "@/lib/content";

type Line = (typeof hero.console.lines)[number];

const script: readonly Line[] = hero.console.lines;
const PROMPT = hero.console.prompt;

/**
 * A quiet, typed-out summary card. It plays once, then rests: no looping,
 * no fake hacking. With reduced motion it renders complete immediately.
 */
export function Console() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0); // lines fully visible
  const [typed, setTyped] = useState(0); // characters typed into the current command
  const done = !!reduce || shown >= script.length || script.length === 0;

  useEffect(() => {
    if (done) return;
    const line = script[shown];
    const delay =
      line.kind === "cmd" && typed < line.text.length
        ? 55 + Math.random() * 60
        : line.kind === "cmd"
          ? 260
          : line.kind === "gap"
            ? 120
            : 70;
    const t = setTimeout(() => {
      if (line.kind === "cmd" && typed < line.text.length) {
        setTyped((c) => c + 1);
      } else {
        setShown((s) => s + 1);
        setTyped(0);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [shown, typed, done]);

  const visible = done ? script.length : shown;
  const typing = !done && script[shown].kind === "cmd";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden rounded-md border border-line bg-raised font-mono text-[0.75rem] leading-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] sm:text-[0.8125rem]"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[0.6875rem] text-faint">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        <span>{hero.console.windowTitle}</span>
      </div>

      {/* Screen readers get the whole summary at once, not a character stream. */}
      <figcaption className="sr-only">{hero.console.summary}</figcaption>

      <div aria-hidden="true" className="min-h-[19.5rem] overflow-x-auto px-4 py-4 sm:px-5">
        {script.slice(0, visible).map((line, i) => (
          <ConsoleLine key={i} line={line} />
        ))}
        <div className="whitespace-pre">
          <span className="text-faint">{PROMPT} </span>
          {typing && <span className="text-fg">{script[shown].text.slice(0, typed)}</span>}
          {(typing || done) && <Caret />}
        </div>
      </div>
    </motion.figure>
  );
}

function ConsoleLine({ line }: { line: Line }) {
  if (line.kind === "gap") return <div className="h-3" />;
  if (line.kind === "cmd")
    return (
      <div className="whitespace-pre">
        <span className="text-faint">{PROMPT} </span>
        <span className="text-fg">{line.text}</span>
      </div>
    );
  return <div className={`whitespace-pre ${line.accent ? "text-accent" : "text-muted"}`}>{line.text}</div>;
}

function Caret() {
  return <span className="caret ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-accent/80" />;
}
