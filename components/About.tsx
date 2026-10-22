import Image from "next/image";
import { about } from "@/lib/content";
import { Emphasis } from "./ui/Emphasis";
import { Reveal } from "./ui/Reveal";

export function About() {
  const facts = about.facts.filter((f) => f.label && f.value);

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-3 font-mono text-xs tracking-wider text-faint uppercase">
              <span className="text-accent">01</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              {about.label}
            </p>
            <Reveal>
              <h2
                id="about-title"
                className="mt-5 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.025em] text-balance"
              >
                <Emphasis text={about.heading} />
              </h2>
            </Reveal>
            {about.photo && (
              <Reveal variant="fade" delay={0.15}>
                <figure className="group mt-10 w-full max-w-[15rem] sm:max-w-[17rem]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] border border-line bg-raised">
                    <Image
                      src={about.photo}
                      alt={about.photoAlt}
                      fill
                      sizes="(min-width: 640px) 272px, 240px"
                      className="object-cover grayscale contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
                    />
                  </div>
                  {(about.captionLeft || about.captionRight) && (
                    <figcaption className="mt-2.5 flex justify-between gap-4 font-mono text-[0.6875rem] text-faint">
                      <span>{about.captionLeft}</span>
                      <span>{about.captionRight}</span>
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            )}
          </div>
        </div>

        <div className="space-y-5 text-pretty text-muted lg:col-span-6 lg:col-start-7 lg:pt-12">
          {about.paragraphs
            .filter((p) => p.text)
            .map((p, i) => (
              <Reveal key={i} variant="fade" delay={0.1 + i * 0.05}>
                <p className={p.highlight ? "text-fg" : undefined}>{p.text}</p>
              </Reveal>
            ))}

          {facts.length > 0 && (
            <dl className="!mt-10 divide-y divide-line border-y border-line">
              {facts.map((f, i) => (
                <Reveal
                  key={f.label}
                  variant="slide"
                  delay={0.05 * i}
                  className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4"
                >
                  <dt className="font-mono text-xs tracking-wide text-faint uppercase sm:pt-0.5">{f.label}</dt>
                  <dd className="text-sm text-fg">{f.value}</dd>
                </Reveal>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
