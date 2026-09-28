import type { ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
};

/** The recurring section header: a mono index on a hairline, then a heading. */
export function SectionHeading({ index, label, title, lede, id }: Props) {
  return (
    <header className="max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-xs tracking-wider text-faint uppercase">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        {label}
      </p>
      <h2 id={id} className="mt-5 font-display text-[clamp(1.875rem,4.2vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-xl text-pretty text-muted">{lede}</p>}
    </header>
  );
}
