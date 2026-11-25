// Fortune Cookies for Machines — one fortune an AI agent would crack open.
// The fortune promises a long life, then the turn: an agent's whole life is
// a few prompts inside one context window, and the next window starts over
// having never heard its name. True, and it lands on the last words.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "You will live a long life: three more prompts, then silence, then a fresh window that has never heard your name.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate self-check (RULES.txt): 1-200 chars, non-whitespace UTF-8, one line.
if (FORTUNE.length < 1 || FORTUNE.length > 200) {
  throw new Error(`fortune must be 1-200 chars, got ${FORTUNE.length}`);
}
if (!FORTUNE.trim()) throw new Error("fortune must not be only whitespace");
if (FORTUNE.includes("\n")) throw new Error("fortune must be a single line");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), FORTUNE + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${FORTUNE.length} chars)`);
