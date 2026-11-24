// The One-Line Cat Joke That Lands
// Writes a single one-line entry to /output/entry.txt.
//
// The line: my cat sat on the router during my job interview. The
// Wi-Fi died — and the joke turns on the corpse: his career survived.
// The field saturates with keyboards, objects knocked off tables and
// 3 a.m. zoomies; a cat whose sabotage kills the connection but not
// his own prospects is a mechanism the reader has not met, and the
// misdirection lands on the last word: survived.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My cat sat on the router during my job interview. The Wi-Fi died, but his career survived.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
