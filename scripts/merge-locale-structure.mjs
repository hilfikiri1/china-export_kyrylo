#!/usr/bin/env node
/** Validates all locale JSON files have identical key structure */
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "src/i18n/messages");

function flattenKeys(obj, prefix = "") {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...flattenKeys(v, path));
    } else {
      keys.push(path);
    }
  }
  return keys.sort();
}

const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
const base = JSON.parse(readFileSync(join(dir, "pl.json"), "utf8"));
const baseKeys = flattenKeys(base);

for (const file of files) {
  if (file === "pl.json") continue;
  const data = JSON.parse(readFileSync(join(dir, file), "utf8"));
  const keys = flattenKeys(data);
  const missing = baseKeys.filter((k) => !keys.includes(k));
  const extra = keys.filter((k) => !baseKeys.includes(k));
  console.log(`\n${file}: ${keys.length} keys`);
  if (missing.length) console.log(`  Missing (${missing.length}):`, missing.slice(0, 10));
  if (extra.length) console.log(`  Extra (${extra.length}):`, extra.slice(0, 10));
}

console.log(`\npl.json: ${baseKeys.length} keys total`);
