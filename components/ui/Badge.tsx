import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "solid";

const tones: Record<Tone, string> = {
  neutral: "border-line-strong text-muted",
  accent: "border-accent/40 text-accent",
  solid: "border-transparent bg-raised text-fg",
};

/** Small mono label. Status is always spelled out in text, never colour alone. */
export function Badge({ children, tone = "neutral", dot = false }: { children: ReactNode; tone?: Tone; dot?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[2px] border px-1.5 py-0.5 font-mono text-[0.6875rem] leading-4 tracking-wide uppercase ${tones[tone]}`}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
