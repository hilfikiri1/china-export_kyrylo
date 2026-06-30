#!/usr/bin/env node
/** Deep-merge pl.json structure into other locale files, preserving existing translations */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "src/i18n/messages");
const pl = JSON.parse(readFileSync(join(dir, "pl.json"), "utf8"));

function merge(base, target) {
  if (Array.isArray(base)) {
    if (!Array.isArray(target) || target.length !== base.length) {
      return base;
    }
    return base.map((item, i) =>
      typeof item === "object" && item !== null
        ? merge(item, target[i])
        : (target[i] ?? item),
    );
  }

  if (base && typeof base === "object") {
    const result = { ...target };
    for (const key of Object.keys(base)) {
      result[key] = merge(base[key], target?.[key]);
    }
    return result;
  }

  return target ?? base;
}

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "pl.json")) {
  const target = JSON.parse(readFileSync(join(dir, file), "utf8"));
  const merged = merge(pl, target);
  writeFileSync(join(dir, file), `${JSON.stringify(merged, null, 2)}\n`);
  console.log(`Synced ${file}`);
}
