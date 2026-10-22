import { Fragment } from "react";

/**
 * Renders admin text where *words in asterisks* get the amber serif style.
 * Plain text otherwise — no HTML is ever interpreted.
 */
export function Emphasis({ text, className = "font-serif font-normal text-accent" }: { text: string; className?: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className={className}>
            {part}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
