import { contact, site } from "@/lib/content";
import { TerminalEgg } from "./TerminalEgg";

export function Footer() {
  const links = [
    { label: contact.labels.github, href: contact.github },
    { label: contact.labels.linkedin, href: contact.linkedin },
    { label: contact.labels.email, href: contact.email ? `mailto:${contact.email}` : "" },
  ].filter((l) => l.href);

  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-10 py-14 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">{site.name}</p>
          {site.footer.tagline && (
            <p className="mt-1 font-mono text-xs tracking-wide text-faint">{site.footer.tagline}</p>
          )}
        </div>
        <ul className="flex flex-wrap gap-x-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="shell flex items-center justify-between gap-4 border-t border-line py-3">
        <p className="text-xs text-faint">
          © {new Date().getFullYear()} {site.fullName || site.name}.{site.footer.note && ` ${site.footer.note}`}
        </p>
        {site.footer.terminal.length > 0 && <TerminalEgg />}
      </div>
    </footer>
  );
}
