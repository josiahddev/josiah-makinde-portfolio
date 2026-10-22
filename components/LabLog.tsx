import { labs } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

/** A plain log of completed Packet Tracer labs, styled like console output rather than cards. */
export function LabLog() {
  if (!labs.show || labs.items.length === 0) return null;

  return (
    <section aria-labelledby="labs-title" className="mt-20 sm:mt-28">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs tracking-wider text-accent uppercase">{labs.kicker}</p>
          <h3 id="labs-title" className="mt-2 font-display text-2xl font-semibold tracking-tight">
            {labs.title}
          </h3>
          {labs.text && <p className="mt-3 max-w-sm text-[0.9375rem] text-pretty text-muted">{labs.text}</p>}
          <p className="mt-5 font-mono text-xs text-faint">
            {labs.items.length} {labs.countLabel}
            {labs.footnote && ` · ${labs.footnote}`}
          </p>
        </div>

        <Reveal variant="fade" className="min-w-0 lg:col-span-8">
          <div className="overflow-hidden rounded-md border border-line bg-raised font-mono text-[0.8125rem]">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[0.6875rem] text-faint">
              <span>{labs.windowTitle}</span>
              {labs.dateRange && <span className="hidden sm:inline">{labs.dateRange}</span>}
            </div>
            <ol className="divide-y divide-line/70">
              {labs.items.map((lab, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[3.25rem_1fr] gap-x-3 gap-y-0.5 px-4 py-2.5 transition-colors hover:bg-bg/60 sm:grid-cols-[3.25rem_3.5rem_1fr_6rem_4.5rem] sm:items-center"
                >
                  <span className="text-accent">{labs.doneTag}</span>
                  <span className="hidden text-faint sm:inline">{lab.id}</span>
                  <span className="font-sans text-sm text-fg">
                    <span className="font-mono text-faint sm:hidden">{lab.id} </span>
                    {lab.title}
                  </span>
                  <span className="col-start-2 text-[0.6875rem] text-faint uppercase sm:col-start-auto">
                    {lab.topic}
                    {lab.date && <span className="sm:hidden"> · {lab.date}</span>}
                  </span>
                  <span className="hidden text-right text-xs text-faint sm:inline">{lab.date}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
