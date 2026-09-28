import { securityAssessment as a, type Risk } from "@/lib/data";
import { Reveal } from "./ui/Reveal";

/** Risk is always spelled out; the marker shape doubles it for scanning, never replaces it. */
function RiskLabel({ risk }: { risk: Risk }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${risk === "High" ? "text-accent" : "text-muted"}`}>
      <span
        aria-hidden="true"
        className={`inline-block size-2 rounded-[1px] border ${
          risk === "High" ? "border-accent bg-accent" : "border-muted bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)]"
        }`}
      />
      {risk}
    </span>
  );
}

export function SecurityAssessment() {
  const high = a.findings.filter((f) => f.risk === "High").length;

  return (
    <article aria-labelledby="assessment-title" className="rounded-md border border-line bg-raised/50">
      <header className="grid gap-6 border-b border-line p-5 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-[2px] border border-accent/40 px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-wide text-accent uppercase">
              Security
            </span>
            <span className="font-mono text-[0.6875rem] tracking-wider text-faint uppercase">{a.kicker}</span>
          </div>
          <h3
            id="assessment-title"
            className="mt-4 font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight font-semibold tracking-tight text-balance"
          >
            {a.title}
          </h3>
          <p className="mt-3 max-w-xl text-pretty text-muted">{a.summary}</p>
        </div>

        <div className="space-y-4 lg:col-span-5 lg:border-l lg:border-line lg:pl-8">
          <p className="border-l-2 border-accent/60 pl-3 text-sm text-pretty text-muted">
            <span className="font-mono text-[0.6875rem] tracking-wider text-accent uppercase">Lab scenario · </span>
            {a.scenario}
          </p>
          <dl className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <dt className="tracking-wider text-faint uppercase">Findings</dt>
              <dd className="mt-1 font-sans text-sm text-fg">
                {a.findings.length} across 2 systems · {high} rated High
              </dd>
            </div>
            <div>
              <dt className="tracking-wider text-faint uppercase">Team</dt>
              <dd className="mt-1 font-sans text-sm text-fg">{a.team}</dd>
            </div>
          </dl>
        </div>
      </header>

      <ul className="divide-y divide-line/70 sm:hidden" aria-label="Findings">
        {a.findings.map((f) => (
          <li key={f.name} className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-fg">{f.name}</p>
              <span className="shrink-0 text-sm font-medium">
                <RiskLabel risk={f.risk} />
              </span>
            </div>
            <p className="mt-1 font-mono text-[0.6875rem] text-faint">
              {f.system} · {f.service} · likelihood {f.likelihood.toLowerCase()}, impact {f.impact.toLowerCase()}
            </p>
            <p className="mt-2 text-sm text-muted">
              <span className="text-faint">Fix: </span>
              {f.control}
            </p>
          </li>
        ))}
      </ul>

      <Reveal variant="fade" className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <caption className="sr-only">
            Vulnerabilities found, with likelihood, impact, overall risk and the recommended control
          </caption>
          <thead>
            <tr className="border-b border-line font-mono text-[0.6875rem] tracking-wider text-faint uppercase">
              <th scope="col" className="px-5 py-3 font-normal sm:pl-8">Finding</th>
              <th scope="col" className="px-3 py-3 font-normal">Service</th>
              <th scope="col" className="px-3 py-3 font-normal">Likelihood</th>
              <th scope="col" className="px-3 py-3 font-normal">Impact</th>
              <th scope="col" className="px-3 py-3 font-normal">Risk</th>
              <th scope="col" className="px-5 py-3 font-normal sm:pr-8">Recommended control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {a.findings.map((f) => (
              <tr key={f.name} className="align-top transition-colors hover:bg-bg/50">
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

      <footer className="grid gap-8 border-t border-line p-5 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs tracking-wider text-faint uppercase">Policies we recommended</p>
          <ol className="mt-3 space-y-1.5 text-sm text-fg">
            {a.policies.map((p, i) => (
              <li key={p} className="flex gap-3">
                <span className="font-mono text-xs text-accent">{i + 1}.</span>
                {p}
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-7">
          <p className="font-mono text-xs tracking-wider text-faint uppercase">What stuck with me</p>
          <p className="mt-3 text-pretty text-fg/90">{a.takeaway}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools">
            {a.tools.map((t) => (
              <li key={t} className="rounded-[2px] border border-line px-2 py-1 font-mono text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs text-faint">Clear scan screenshots coming soon</p>
        </div>
      </footer>
    </article>
  );
}
