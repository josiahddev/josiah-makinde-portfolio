import { networkingLabs } from "@/lib/data";
import { Reveal } from "./ui/Reveal";

/** A plain log of completed Packet Tracer labs, styled like console output rather than cards. */
export function LabLog() {
  return (
    <section aria-labelledby="labs-title" className="mt-20 sm:mt-28">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs tracking-wider text-accent uppercase">Lab log</p>
          <h3 id="labs-title" className="mt-2 font-display text-2xl font-semibold tracking-tight">
            Networking labs in Cisco Packet Tracer
          </h3>
          <p className="mt-3 max-w-sm text-[0.9375rem] text-pretty text-muted">
            Graded activities I completed in Cisco&rsquo;s Networking Essentials 2.0 course — deploying and cabling
            devices, configuring end devices, building a simple network, and setting up DHCP and FTP.
          </p>
          <p className="mt-5 font-mono text-xs text-faint">
            {networkingLabs.length} completed · topology screenshots coming soon
          </p>
        </div>

        <Reveal variant="fade" className="min-w-0 lg:col-span-8">
          <div className="overflow-hidden rounded-md border border-line bg-raised font-mono text-[0.8125rem]">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[0.6875rem] text-faint">
              <span>packet-tracer / networking-essentials-2.0</span>
              <span className="hidden sm:inline">Jun — Jul 2024</span>
            </div>
            <ol className="divide-y divide-line/70">
              {networkingLabs.map((lab) => (
                <li
                  key={lab.id}
                  className="grid grid-cols-[3.25rem_1fr] gap-x-3 gap-y-0.5 px-4 py-2.5 transition-colors hover:bg-bg/60 sm:grid-cols-[3.25rem_3.5rem_1fr_6rem_4.5rem] sm:items-center"
                >
                  <span className="text-accent">[done]</span>
                  <span className="hidden text-faint sm:inline">{lab.id}</span>
                  <span className="font-sans text-sm text-fg">
                    <span className="font-mono text-faint sm:hidden">{lab.id} </span>
                    {lab.title}
                  </span>
                  <span className="col-start-2 text-[0.6875rem] text-faint uppercase sm:col-start-auto">
                    {lab.topic}
                    <span className="sm:hidden"> · {lab.date}</span>
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
