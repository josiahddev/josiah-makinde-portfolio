import { contact, site } from "@/lib/data";
import { ContactForm } from "./ContactForm";
import { GitHubIcon, LinkedInIcon } from "./ui/icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const channels = [
  { k: "Email", v: contact.email, href: `mailto:${contact.email}` },
  {
    k: "LinkedIn",
    v: "josiah-makinde",
    href: contact.linkedin,
    icon: <LinkedInIcon className="size-3.5" />,
    external: true,
  },
  {
    k: "GitHub",
    v: contact.githubHandle,
    href: contact.github,
    icon: <GitHubIcon className="size-3.5" />,
    external: true,
  },
  { k: "Badges", v: "Credly", href: contact.credly, external: true },
  { k: "Location", v: site.location },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 sm:py-32">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            index="08"
            label="Contact"
            title="Let's talk."
            lede="Hiring for IT support, systems or junior security work — or just want to compare notes on a PowerShell script? I'd like to hear from you."
          />

          <dl className="mt-10 border-t border-line">
            {channels.map((c) => (
              <div key={c.k} className="grid grid-cols-[6.5rem_1fr] items-center gap-3 border-b border-line py-3.5">
                <dt className="font-mono text-xs tracking-wide text-faint uppercase">{c.k}</dt>
                <dd className="min-w-0 text-[0.9375rem]">
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group inline-flex max-w-full items-center gap-2 text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                    >
                      {c.icon}
                      <span className="truncate">{c.v}</span>
                    </a>
                  ) : (
                    <span className="text-fg">{c.v}</span>
                  )}
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[6.5rem_1fr] items-center gap-3 border-b border-line py-3.5">
              <dt className="font-mono text-xs tracking-wide text-faint uppercase">CV</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
                {contact.cv.available ? (
                  <>
                    <a
                      href={contact.cv.href}
                      download
                      className="text-fg underline decoration-accent underline-offset-4"
                    >
                      Download PDF ↓
                    </a>
                    <a
                      href={contact.cv.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
                    >
                      View in browser ↗
                    </a>
                  </>
                ) : (
                  <span className="text-faint">CV upload pending</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <Reveal variant="fade" className="lg:col-span-6 lg:col-start-7 lg:pt-3">
          <div className="rounded-md border border-line bg-raised/50 p-5 sm:p-8">
            <h3 className="font-display text-lg font-semibold tracking-tight">Send a message</h3>
            <p className="mt-1 mb-7 text-sm text-muted">Goes straight to my inbox.</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
