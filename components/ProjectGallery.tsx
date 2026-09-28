"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/lib/data";

type Props = { images: ProjectImage[]; title: string };

/** Main image + thumbnail strip + native <dialog> lightbox. Handles 0, 1 or many images. */
export function ProjectGallery({ images, title }: Props) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length),
    [images.length],
  );

  const openLightbox = () => dialogRef.current?.showModal();
  const closeLightbox = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (images.length === 0) return <ScreenshotPlaceholder />;

  const current = images[index];

  return (
    <div>
      <button
        type="button"
        onClick={openLightbox}
        className="group/shot relative block aspect-[16/9] w-full overflow-hidden rounded-md border border-line bg-bg"
        aria-label={`Open screenshot: ${current.caption}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover object-left-top transition-transform duration-700 ease-out group-hover/shot:scale-[1.03]"
            />
          </motion.div>
        </AnimatePresence>
        <span className="absolute right-3 bottom-3 rounded-[2px] bg-bg/85 px-2 py-1 font-mono text-[0.6875rem] text-muted opacity-0 backdrop-blur transition-opacity group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100">
          click to enlarge ↗
        </span>
      </button>

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          <span className="text-faint">
            {String(index + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}
          </span>{" "}
          {current.caption}
        </p>
        {images.length > 1 && (
          <div className="flex shrink-0 gap-1">
            <NavButton label="Previous screenshot" onClick={() => go(-1)}>
              ←
            </NavButton>
            <NavButton label="Next screenshot" onClick={() => go(1)}>
              →
            </NavButton>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]" aria-label={`${title} screenshots`}>
          {images.map((img, i) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show screenshot: ${img.caption}`}
                aria-current={i === index ? "true" : undefined}
                className={`relative block h-11 w-[4.5rem] overflow-hidden rounded-[2px] border transition-[border-color,opacity] ${
                  i === index ? "border-accent" : "border-line opacity-55 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="72px" className="object-cover object-left-top" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        aria-label={`${title} — ${current.caption}`}
        onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        className="m-auto max-h-none w-[min(100vw-1.5rem,80rem)] max-w-none bg-transparent p-0 text-fg backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-line-strong bg-bg">
          <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted">{current.caption}</p>
          <div className="flex gap-1">
            {images.length > 1 && (
              <>
                <NavButton label="Previous screenshot" onClick={() => go(-1)}>
                  ←
                </NavButton>
                <NavButton label="Next screenshot" onClick={() => go(1)}>
                  →
                </NavButton>
              </>
            )}
            <NavButton label="Close" onClick={closeLightbox}>
              esc
            </NavButton>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  children,

}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;

}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}

      className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-[3px] border border-line px-2 font-mono text-xs text-muted transition-colors hover:border-fg hover:text-fg"
    >
      {children}
    </button>
  );
}

export function ScreenshotPlaceholder() {
  return (
    <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line-strong bg-bg/50 text-center">
      <span aria-hidden="true" className="font-mono text-lg text-faint">
        [ ]
      </span>
      <p className="font-mono text-xs text-muted">Project screenshots coming soon</p>
    </div>
  );
}
