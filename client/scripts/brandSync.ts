// Writes every file generated from src/globals/brand.ts.
//
// Called by `npm run brand:sync` (scripts/syncBrand.ts) and by the brand-sync
// Vite plugin on dev and build — so the generated files cannot be stale while
// anyone is working. Writes only when the contents actually change, to avoid
// waking the dev server's watcher.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BRAND_ARTIFACTS } from "../src/globals/brandArtifacts.ts";

const clientRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** @returns the paths that were rewritten. */
export function syncBrand(): string[] {
  const written: string[] = [];
  for (const { path, contents } of BRAND_ARTIFACTS) {
    const file = resolve(clientRoot, path);
    const next = contents();
    let current: string | null;
    try {
      current = readFileSync(file, "utf8");
    } catch {
      current = null; // not written yet
    }
    if (current === next) continue;
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, next, "utf8");
    written.push(path);
  }
  return written;
}
