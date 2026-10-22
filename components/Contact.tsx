import type { ReactNode } from "react";
import { contact, site } from "@/lib/content";
import { ContactForm } from "./ContactForm";
import { GitHubIcon, LinkedInIcon } from "./ui/icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const L = contact.labels;

type Channel = { k: string; v: string; href?: string; icon?: ReactNode; external?: boolean };

/** Rows with an empty value are left out, so clearing a field in the admin hides it. */
const channels: Channel[] = (
  [
    contact.email && { k: L.email, v: contact.email, href: `mailto:${contact.email}` },
    contact.linkedin && {
      k: L.linkedin,
      v: contact.linkedinLabel || contact.linkedin,
      href: contact.linkedin,
      icon: <LinkedInIcon className="size-3.5" />,
      external: true,
    },
    contact.github && {
      k: L.github,
      v: contact.githubHandle || contact.github,
      href: contact.github,
      icon: <GitHubIcon className="size-3.5" />,
      external: true,
    },
    contact.credly && { k: L.badges, v: L.badgesValue, href: contact.credly, external: true },
    site.location && { k: L.location, v: site.location },
  ] as (Channel | "" | null)[]
).filter((c): c is Channel => !!c);

export function Contact() {
  const cv = contact.cv.available && contact.cv.file ? contact.cv.file : null;

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 sm:py-32">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" index="08" label={contact.label} title={contact.title} lede={contact.lede} />

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
              <dt className="font-mono text-xs tracking-wide text-faint uppercase">{L.cv}</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
                {cv ? (
                  <>
                    <a href={cv} download className="text-fg underline decoration-accent underline-offset-4">
                      {L.cvDownload}
                    </a>
                    <a
                      href={cv}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
                    >
                      {L.cvView}
                    </a>
                  </>
                ) : (
                  <span className="text-faint">{L.cvPending}</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        {contact.email && (
          <Reveal variant="fade" className="lg:col-span-6 lg:col-start-7 lg:pt-3">
            <div className="rounded-md border border-line bg-raised/50 p-5 sm:p-8">
              <h3 className="font-display text-lg font-semibold tracking-tight">{contact.form.title}</h3>
              <p className="mt-1 mb-7 text-sm text-muted">{contact.form.subtitle}</p>
              <ContactForm />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
