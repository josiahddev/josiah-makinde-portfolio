"use client";

import { motion } from "motion/react";
import { handsOn } from "@/lib/content";

type Node = { id: string; x: number; y: number; label: string; sub: string; accent?: boolean };

const d = handsOn.diagram;

const W = 150;
const H = 46;

const nodes: Node[] = [
  { id: "ups", x: 10, y: 10, ...d.power },
  { id: "srv", x: 200, y: 10, ...d.servers },
  { id: "sw", x: 105, y: 118, ...d.switches, accent: true },
  { id: "ap", x: 10, y: 226, ...d.wireless },
  { id: "lan", x: 200, y: 226, ...d.wired },
  { id: "lap", x: 10, y: 334, ...d.laptops },
  { id: "cbt", x: 200, y: 334, ...d.testing },
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

// Orthogonal connectors: bottom-centre of one box to top-centre of the next.
const links: [string, string, "solid" | "dashed"][] = [
  ["ups", "sw", "dashed"],
  ["srv", "sw", "solid"],
  ["sw", "ap", "solid"],
  ["sw", "lan", "solid"],
  ["ap", "lap", "dashed"],
  ["lan", "cbt", "solid"],
];

function path(a: Node, b: Node) {
  const x1 = a.x + W / 2;
  const y1 = a.y + H;
  const x2 = b.x + W / 2;
  const y2 = b.y;
  const mid = (y1 + y2) / 2;
  return `M${x1} ${y1} V${mid} H${x2} V${y2}`;
}

export function NetworkDiagram() {
  return (
    <svg
      viewBox="0 0 360 390"
      role="img"
      aria-labelledby="net-title net-desc"
      className="h-auto w-full font-mono"
    >
      <title id="net-title">{handsOn.fieldNotes.title}</title>
      <desc id="net-desc">
        {`Simplified sketch: ${d.power.label} and ${d.servers.label} connect to ${d.switches.label}, which feed ${d.wireless.label} serving ${d.laptops.label}, and ${d.wired.label} serving ${d.testing.label}.`}
      </desc>

      {links.map(([from, to, style], i) => (
        <motion.path
          key={from + to}
          d={path(byId[from], byId[to])}
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth={1.25}
          strokeDasharray={style === "dashed" ? "3 4" : undefined}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: "easeInOut" }}
        />
      ))}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <rect
            x={n.x}
            y={n.y}
            width={W}
            height={H}
            rx={3}
            fill="var(--color-bg)"
            stroke={n.accent ? "var(--color-accent)" : "var(--color-line-strong)"}
          />
          <text x={n.x + 12} y={n.y + 20} fontSize={12.5} fill="var(--color-fg)" fontFamily="var(--font-sans)">
            {n.label}
          </text>
          <text x={n.x + 12} y={n.y + 36} fontSize={10} fill="var(--color-faint)">
            {n.sub}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
