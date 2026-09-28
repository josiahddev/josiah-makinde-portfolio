import { handsOn, schoolIct } from "@/lib/data";
import { NetworkDiagram } from "./NetworkDiagram";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function HandsOn() {
  return (
    <section aria-labelledby="handson-title" className="border-t border-line bg-raised/40 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="handson-title"
          index="03"
          label="Hands-on"
          title="What I've actually worked with."
          lede="Not a list of buzzwords — the kinds of problems that land on my desk, and the kit I've had my hands on."
        />

        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <ol className="lg:col-span-7">
            {handsOn.map((h, i) => (
              <li key={h.area} className="border-t border-line last:border-b">
                <Reveal variant="fade" delay={i * 0.04} className="group grid gap-3 py-6 sm:grid-cols-[2.5rem_1fr]">
                  <span className="font-mono text-xs text-faint transition-colors group-hover:text-accent sm:pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">{h.area}</h3>
                    <p className="mt-1.5 max-w-xl text-[0.9375rem] text-muted">{h.detail}</p>
                    <p className="mt-3 font-mono text-xs text-faint">{h.tags.join("  /  ")}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <aside aria-labelledby="school-title" className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <p className="font-mono text-xs tracking-wider text-accent uppercase">Field notes</p>
              <h3 id="school-title" className="mt-2 font-display text-xl font-semibold tracking-tight">
                A school ICT environment
              </h3>
              <p className="mt-2 text-[0.9375rem] text-muted">
                I&rsquo;ve worked in and around a setup like this — supporting and maintaining it day to day. I
                didn&rsquo;t design it; I learned a lot keeping it running.
              </p>

              <figure className="mt-6 rounded-md border border-line bg-bg p-4 sm:p-6">
                <NetworkDiagram />
                <figcaption className="mt-3 border-t border-line pt-3 font-mono text-[0.6875rem] text-faint">
                  sketch — simplified, not a network design
                </figcaption>
              </figure>

              <ul className="sr-only">
                {schoolIct.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
