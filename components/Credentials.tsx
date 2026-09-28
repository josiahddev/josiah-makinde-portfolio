import { contact, credentials, credentialTypeLabel, type Credential } from "@/lib/data";

const groups: { type: Credential["type"]; title: string; note: string }[] = [
  { type: "badge", title: "Earned badges", note: "Issued through Credly — each one links to its verification page." },
  { type: "in-progress", title: "In progress", note: "Started, not finished." },
  { type: "course", title: "Courses & training", note: "Attended and completed. Training, not exams." },
];

export function Credentials() {
  return (
    <section className="mt-24 border-t border-line pt-14" aria-labelledby="credentials-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 id="credentials-title" className="font-display text-2xl font-semibold tracking-tight">
            Certificates & training
          </h3>
          <p className="mt-3 max-w-sm text-pretty text-muted">
            What I&rsquo;ve completed, labelled for what it is. Where it says <em>course</em>, it means training — not a
            passed certification exam.
          </p>
          <a
            href={contact.credly}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            Verify on Credly ↗
          </a>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8">
          {groups.map((g) => {
            const items = credentials.filter((c) => c.type === g.type);
            return (
              <section
                key={g.type}
                aria-label={g.title}
                className={g.type === "course" ? "sm:col-span-2" : undefined}
              >
                <p className="font-mono text-xs tracking-wider text-accent uppercase">{g.title}</p>
                <p className="mt-1 text-xs text-faint">{g.note}</p>
                <ul
                  className={`mt-4 border-t border-line ${g.type === "course" ? "sm:grid sm:grid-cols-2 sm:gap-x-10" : ""}`}
                >
                  {items.map((c) => (
                    <li key={c.name + c.issuer} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                      <span className="min-w-0">
                        {c.url ? (
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group block text-[0.9375rem] text-fg transition-colors hover:text-accent"
                          >
                            {c.name}
                            <span aria-hidden="true" className="ml-1.5 font-mono text-xs text-faint transition-colors group-hover:text-accent">
                              ↗
                            </span>
                            <span className="sr-only"> (verify on Credly, opens in a new tab)</span>
                          </a>
                        ) : (
                          <span className="block text-[0.9375rem] text-fg">{c.name}</span>
                        )}
                        {(c.issuer || c.note) && (
                          <span className="mt-0.5 block text-xs text-muted">
                            {c.issuer}
                            {c.issuer && c.note && " — "}
                            {c.note}
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-faint">
                        {c.date ?? credentialTypeLabel[c.type]}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
