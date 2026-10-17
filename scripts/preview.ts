/** Preview the migration for one file, printing changed lines only. */
import { readFileSync } from "node:fs";
import { convertSource } from "./migrate-light-theme";

const target = process.argv[2] ?? "src/app/services/page.tsx";
const original = readFileSync(target, "utf8");
const converted = convertSource(original);

const a = original.split("\n");
const b = converted.split("\n");
const max = Math.max(a.length, b.length);

for (let i = 0; i < max; i += 1) {
  if (a[i] !== b[i]) {
    console.log(`- ${(a[i] ?? "").trim()}`);
    console.log(`+ ${(b[i] ?? "").trim()}`);
    console.log("");
  }
}

