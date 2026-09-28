"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { contact, nav } from "@/lib/data";
import { useActiveSection } from "./useActiveSection";

const ids = nav.map((n) => n.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  // Get out of the way while reading down; come back as soon as the reader scrolls up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > prev && !open);
  });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
          scrolled || open ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-6">
          <a
            href="#top"
            className="group flex items-baseline gap-2 font-display font-semibold tracking-tight"
            onClick={() => setOpen(false)}
          >
            Josiah Makinde
            <span className="hidden font-mono text-[0.6875rem] font-normal text-faint transition-colors group-hover:text-accent sm:inline">
              ~/it/systems/security
            </span>
          </a>

          <ul className="hidden items-center lg:flex">
            {nav.slice(1).map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`relative block px-3 py-2 text-sm transition-colors ${
                    active === item.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <CvLink className="hidden sm:inline-flex" />
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-fg transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px bg-fg transition-all duration-300 ${open ? "top-1.5 w-5 -rotate-45" : "top-3 w-3.5"}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu active={active} onNavigate={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ active, onNavigate }: { active: string; onNavigate: () => void }) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-bg lg:hidden"
    >
      <div className="shell flex min-h-full flex-col pt-4 pb-10">
        <ul>
          {nav.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-line"
            >
              <a
                href={`#${item.id}`}
                onClick={onNavigate}
                aria-current={active === item.id ? "true" : undefined}
                className="flex items-baseline gap-4 py-4 font-display text-2xl font-medium tracking-tight"
              >
                <span className="w-6 font-mono text-xs text-faint">{String(i).padStart(2, "0")}</span>
                <span className={active === item.id ? "text-accent" : ""}>{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-4 pt-10">
          <CvLink className="inline-flex w-full" />
          <a href={`mailto:${contact.email}`} className="font-mono text-xs break-all text-faint">
            {contact.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function CvLink({ className = "" }: { className?: string }) {
  const base = "min-h-10 items-center justify-center gap-2 rounded-[3px] border px-4 text-sm font-medium";
  if (!contact.cv.available) {
    return (
      <span className={`${base} cursor-not-allowed border-line text-faint ${className}`} title="CV upload pending">
        CV pending
      </span>
    );
  }
  return (
    <a
      href={contact.cv.href}
      download
      className={`${base} border-line-strong transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      Download CV{" "}
      <span aria-hidden="true" className="font-mono text-xs">
        ↓
      </span>
    </a>
  );
}
