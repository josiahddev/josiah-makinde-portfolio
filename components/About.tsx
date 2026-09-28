import Image from "next/image";
import { Reveal } from "./ui/Reveal";

const facts = [
  { k: "Studied", v: "B.Sc. Computer Science, Mountain Top University (2022)" },
  { k: "Working in", v: "IT support since 2021 — automotive, military college, accountancy" },
  { k: "Good at", v: "Staying calm with a frustrated user and a machine that won't boot" },
  { k: "On the side", v: "UI/UX design in Figma — six case studies" },
  { k: "Heading toward", v: "Network administration and cybersecurity" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-24 sm:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
          <p className="flex items-center gap-3 font-mono text-xs tracking-wider text-faint uppercase">
            <span className="text-accent">01</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            About
          </p>
          <Reveal>
            <h2
              id="about-title"
              className="mt-5 font-display text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.025em] text-balance"
            >
              I like finding out <em className="font-serif font-normal text-accent">why</em> something broke — then
              making sure it doesn&rsquo;t break that way again.
            </h2>
          </Reveal>
          <Reveal variant="fade" delay={0.15}>
            <figure className="group mt-10 w-full max-w-[15rem] sm:max-w-[17rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] border border-line bg-raised">
                <Image
                  src="/josiah.webp"
                  alt="Portrait of Josiah Makinde, smiling, wearing clear-framed glasses and a white T-shirt"
                  fill
                  sizes="(min-width: 640px) 272px, 240px"
                  className="object-cover grayscale contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-2.5 flex justify-between font-mono text-[0.6875rem] text-faint">
                <span>josiah makinde</span>
                <span>kaduna, ng</span>
              </figcaption>
            </figure>
          </Reveal>
          </div>
        </div>

        <div className="space-y-5 text-pretty text-muted lg:col-span-6 lg:col-start-7 lg:pt-12">
          <Reveal variant="fade" delay={0.1}>
            <p>
              I studied Computer Science, but most of what I know about computers I learned by fixing them for other
              people. My first IT role was an internship at Peugeot Automobile Nigeria; since then I&rsquo;ve supported
              staff at the Armed Forces Command and Staff College during NYSC, and I now look after IT for a chartered
              accountancy firm — the machines, the network, the accounts, the backups and the people using all of it.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.15}>
            <p>
              That work is what pulled me toward security. When you&rsquo;re the person who sets up user access, runs
              the backups and configures the antivirus, you start asking what would happen if those things failed. So
              I&rsquo;m deliberately going deeper into networking, systems administration and security — through Cisco
              coursework, Security+ training, a group vulnerability assessment in a lab, and small tools I build to
              practise.
            </p>
          </Reveal>
          <Reveal variant="fade" delay={0.2}>
            <p className="text-fg">
              I don&rsquo;t know everything, and I won&rsquo;t pretend to. What I do have is real time with real users,
              and the habit of learning whatever the next problem needs.
            </p>
          </Reveal>

          <dl className="!mt-10 divide-y divide-line border-y border-line">
            {facts.map((f, i) => (
              <Reveal
                key={f.k}
                variant="slide"
                delay={0.05 * i}
                className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4"
              >
                <dt className="font-mono text-xs tracking-wide text-faint uppercase sm:pt-0.5">{f.k}</dt>
                <dd className="text-sm text-fg">{f.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
