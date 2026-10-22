import { security as a, type Risk } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

const L = a.labels;

/** Risk is always spelled out; the marker shape doubles it for scanning, never replaces it. */
function RiskLabel({ risk }: { risk: Risk }) {
  const mark = {
    High: "border-accent bg-accent",
    Medium: "border-muted bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)]",
    Low: "border-muted border-dashed",
  }[risk];
  return (
    <span className={`inline-flex items-center gap-1.5 ${risk === "High" ? "text-accent" : "text-muted"}`}>
      <span aria-hidden="true" className={`inline-block size-2 rounded-[1px] border ${mark}`} />
      {risk}
    </span>
  );
}

/** Fills {count}, {systems} and {high} in the admin-editable summary line. */
function findingsSummary() {
  const systems = new Set(a.findings.map((f) => f.system).filter(Boolean)).size;
  const high = a.findings.filter((f) => f.risk === "High").length;
  return L.findingsSummary
    .replaceAll("{count}", String(a.findings.length))
    .replaceAll("{systems}", String(systems))
    .replaceAll("{high}", String(high));
}

export function SecurityAssessment() {
  return (
    <article aria-labelledby="assessment-title" className="rounded-md border border-line bg-raised/50">
      <header className="grid gap-6 border-b border-line p-5 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            {a.tag && (
              <span className="rounded-[2px] border border-accent/40 px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-wide text-accent uppercase">
                {a.tag}
              </span>
            )}
            <span className="font-mono text-[0.6875rem] tracking-wider text-faint uppercase">{a.kicker}</span>
          </div>
          <h3
            id="assessment-title"
            className="mt-4 font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight font-semibold tracking-tight text-balance"
          >
            {a.title}
          </h3>
          {a.summary && <p className="mt-3 max-w-xl text-pretty text-muted">{a.summary}</p>}
        </div>

        <div className="space-y-4 lg:col-span-5 lg:border-l lg:border-line lg:pl-8">
          {a.scenario && (
            <p className="border-l-2 border-accent/60 pl-3 text-sm text-pretty text-muted">
              {a.scenarioLabel && (
                <span className="font-mono text-[0.6875rem] tracking-wider text-accent uppercase">{a.scenarioLabel} · </span>
              )}
              {a.scenario}
            </p>
          )}
          <dl className="grid grid-cols-2 gap-4 font-mono text-xs">
            {a.findings.length > 0 && (
              <div>
                <dt className="tracking-wider text-faint uppercase">{a.findingsLabel}</dt>
                <dd className="mt-1 font-sans text-sm text-fg">{findingsSummary()}</dd>
              </div>
            )}
            {a.team && (
              <div>
                <dt className="tracking-wider text-faint uppercase">{a.teamLabel}</dt>
                <dd className="mt-1 font-sans text-sm text-fg">{a.team}</dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      {a.findings.length > 0 && (
        <>
          <ul className="divide-y divide-line/70 sm:hidden" aria-label={a.findingsLabel}>
            {a.findings.map((f, i) => (
              <li key={i} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-fg">{f.name}</p>
                  <span className="shrink-0 text-sm font-medium">
                    <RiskLabel risk={f.risk} />
                  </span>
                </div>
                <p className="mt-1 font-mono text-[0.6875rem] text-faint">
                  {[f.system, f.service].filter(Boolean).join(" · ")} · {L.likelihood.toLowerCase()}{" "}
                  {f.likelihood.toLowerCase()}, {L.impact.toLowerCase()} {f.impact.toLowerCase()}
                </p>
                {f.control && (
                  <p className="mt-2 text-sm text-muted">
                    <span className="text-faint">{L.fix} </span>
                    {f.control}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <Reveal variant="fade" className="hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <caption className="sr-only">
                {a.findingsLabel}: {L.likelihood}, {L.impact}, {L.risk}, {L.control}
              </caption>
              <thead>
                <tr className="border-b border-line font-mono text-[0.6875rem] tracking-wider text-faint uppercase">
                  <th scope="col" className="px-5 py-3 font-normal sm:pl-8">{L.finding}</th>
                  <th scope="col" className="px-3 py-3 font-normal">{L.service}</th>
                  <th scope="col" className="px-3 py-3 font-normal">{L.likelihood}</th>
                  <th scope="col" className="px-3 py-3 font-normal">{L.impact}</th>
                  <th scope="col" className="px-3 py-3 font-normal">{L.risk}</th>
                  <th scope="col" className="px-5 py-3 font-normal sm:pr-8">{L.control}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {a.findings.map((f, i) => (
                  <tr key={i} className="align-top transition-colors hover:bg-bg/50">
                    <th scope="row" className="px-5 py-3.5 font-normal sm:pl-8">
                      <span className="block text-fg">{f.name}</span>
                      <span className="mt-0.5 block font-mono text-[0.6875rem] text-faint">{f.system}</span>
                    </th>
                    <td className="px-3 py-3.5 font-mono text-xs whitespace-nowrap text-muted">{f.service}</td>
                    <td className="px-3 py-3.5 text-muted">{f.likelihood}</td>
                    <td className="px-3 py-3.5 text-muted">{f.impact}</td>
                    <td className="px-3 py-3.5 font-medium">
                      <RiskLabel risk={f.risk} />
                    </td>
                    <td className="px-5 py-3.5 text-muted sm:pr-8">{f.control}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </>
      )}

      <footer className="grid gap-8 border-t border-line p-5 sm:p-8 lg:grid-cols-12">
        {a.policies.length > 0 && (
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-wider text-faint uppercase">{a.policiesLabel}</p>
            <ol className="mt-3 space-y-1.5 text-sm text-fg">
              {a.policies.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-xs text-accent">{i + 1}.</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
        )}
        <div className="lg:col-span-7">
          {a.takeaway && (
            <>
              <p className="font-mono text-xs tracking-wider text-faint uppercase">{a.takeawayLabel}</p>
              <p className="mt-3 text-pretty text-fg/90">{a.takeaway}</p>
            </>
          )}
          {a.tools.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools">
              {a.tools.map((t, i) => (
                <li key={i} className="rounded-[2px] border border-line px-2 py-1 font-mono text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {a.footnote && <p className="mt-4 font-mono text-xs text-faint">{a.footnote}</p>}
        </div>
      </footer>
    </article>
  );
}
