// Validates content/*.json against the admin schema, exactly as the admin reads it.
// Run with `npm run check:content` (needs Node 22.18+ for TypeScript type stripping).
import { createReader } from "@keystatic/core/reader";
import { readFileSync } from "node:fs";
import config from "../keystatic.config.ts";

type SingletonReader = { readOrThrow(): Promise<Record<string, unknown>> };

const reader = createReader(process.cwd(), config);
const readers = reader.singletons as unknown as Record<string, SingletonReader>;
const singletons = config.singletons as Record<string, { path: string }>;

let bad = 0;
for (const key of Object.keys(singletons)) {
  try {
    const data = await readers[key].readOrThrow();
    // Keys in the file that the schema doesn't know would be dropped on the next save.
    const file = JSON.parse(readFileSync(`${singletons[key].path}.json`, "utf8")) as Record<string, unknown>;
    const extra = Object.keys(file).filter((k) => !(k in data));
    console.log(`✓ ${key}${extra.length ? `  ⚠ unknown keys: ${extra.join(", ")}` : ""}`);
    if (extra.length) bad++;
  } catch (e) {
    bad++;
    console.log(`✗ ${key}: ${(e as Error).message.split("\n").slice(0, 4).join(" | ")}`);
  }
}
process.exit(bad ? 1 : 0);
