import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "quiet";

const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] px-5 text-[0.9375rem] font-medium transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-accent",
  ghost: "border border-line-strong text-fg hover:border-fg",
  quiet: "px-0 text-muted hover:text-fg",
};

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  /** Adds a small arrow that nudges on hover. */
  arrow?: "right" | "down" | "out";
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

const arrows = { right: "→", down: "↓", out: "↗" };
const nudge = {
  right: "group-hover/btn:translate-x-0.5",
  down: "group-hover/btn:translate-y-0.5",
  out: "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5",
};

export function Button({ href, variant = "primary", arrow, className = "", children, ...rest }: Props) {
  const external = /^(https?:|mailto:)/.test(href) || href.endsWith(".pdf");
  const content = (
    <>
      {children}
      {arrow && (
        <span aria-hidden="true" className={`font-mono text-[0.85em] transition-transform duration-200 ${nudge[arrow]}`}>
          {arrows[arrow]}
        </span>
      )}
    </>
  );
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
