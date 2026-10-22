import { contact, credentials, type Credential } from "@/lib/content";
import { Emphasis } from "./ui/Emphasis";

const groupOrder: Credential["type"][] = ["badge", "inProgress", "course"];

export function Credentials() {
  const groups = groupOrder
    .map((type) => ({ type, ...credentials.groups[type], items: credentials.items.filter((c) => c.type === type && c.name) }))
    .filter((g) => g.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <section className="mt-24 border-t border-line pt-14" aria-labelledby="credentials-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h3 id="credentials-title" className="font-display text-2xl font-semibold tracking-tight">
            {credentials.title}
          </h3>
          {credentials.text && (
            <p className="mt-3 max-w-sm text-pretty text-muted">
              <Emphasis text={credentials.text} className="italic" />
            </p>
          )}
          {contact.credly && credentials.verifyLabel && (
            <a
              href={contact.credly}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-mono text-xs text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
            >
              {credentials.verifyLabel}
            </a>
          )}
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8">
          {groups.map((g) => (
            <section key={g.type} aria-label={g.title} className={g.type === "course" ? "sm:col-span-2" : undefined}>
              <p className="font-mono text-xs tracking-wider text-accent uppercase">{g.title}</p>
              {g.note && <p className="mt-1 text-xs text-faint">{g.note}</p>}
              <ul className={`mt-4 border-t border-line ${g.type === "course" ? "sm:grid sm:grid-cols-2 sm:gap-x-10" : ""}`}>
                {g.items.map((c, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                    <span className="min-w-0">
                      {c.url ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group block text-[0.9375rem] text-fg transition-colors hover:text-accent"
                        >
                          {c.name}
                          <span
                            aria-hidden="true"
                            className="ml-1.5 font-mono text-xs text-faint transition-colors group-hover:text-accent"
                          >
                            ↗
                          </span>
                          <span className="sr-only"> (verification page, opens in a new tab)</span>
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
                      {c.date || credentials.typeLabels[c.type]}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
