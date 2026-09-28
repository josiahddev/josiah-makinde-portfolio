"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const lines = [
  { t: "$ whoami", c: "text-fg" },
  { t: "josiah", c: "text-muted" },
  { t: "$ status", c: "text-fg" },
  { t: "learning...", c: "text-muted" },
  { t: "building...", c: "text-muted" },
  { t: "debugging...", c: "text-accent" },
];

/** A tiny optional aside in the footer. Easy to miss, easy to ignore. */
export function TerminalEgg() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="footer-terminal"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 items-center font-mono text-xs text-faint transition-colors hover:text-accent"
        title="$_"
      >
        <span aria-hidden="true">&gt;_</span>
        <span className="sr-only">{open ? "Hide" : "Show"} footer terminal</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.pre
            id="footer-terminal"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 bottom-full mb-2 w-52 rounded-md border border-line-strong bg-raised p-4 font-mono text-xs leading-6 shadow-2xl"
          >
            {lines.map((l, i) => (
              <motion.span
                key={l.t}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 * i }}
                className={`block ${l.c}`}
              >
                {l.t}
              </motion.span>
            ))}
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
}
