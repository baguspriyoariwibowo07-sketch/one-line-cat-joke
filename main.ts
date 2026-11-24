// The One-Line Cat Joke That Lands
// Writes a single one-line entry to /output/entry.txt.
//
// The line: my cat sat on the router during my job interview. The
// Wi-Fi died — and the joke turns on the corpse: his career survived.
// The field saturates with keyboards, objects knocked off tables and
// 3 a.m. zoomies; a cat whose sabotage kills the connection but not
// his own prospects is a mechanism the reader has not met, and the
// misdirection lands on the last word: survived.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My cat sat on the router during my job interview. The Wi-Fi died, but his career survived.";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space. The entry is one line on
// one line, so validate the line against the same limits before
// writing — an entry outside the gate is never judged.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

validateEntry(LINE);

// The authored line is exactly 90 characters; that length is part of
// the entry (its two-beat timing — the sabotage, then the survivor —
// depends on it), so pin it: any edit that changes the line's length
// is a different entry, not this one.
if (LINE.length !== 90) {
  throw new Error(`authored line must be 90 characters, got ${LINE.length}`);
}

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk differs from the authored line");
  }
}

main();
