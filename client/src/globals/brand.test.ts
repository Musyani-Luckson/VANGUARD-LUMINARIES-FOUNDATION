import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BRAND } from "./brand";
import { BRAND_ARTIFACTS, brandThemeCss, cssName } from "./brandArtifacts";
import { checkContrast } from "../theme/contrast";

// brand.ts can only be the single source of truth if nothing can quietly stop
// agreeing with it. The generator makes that cheap; this makes it enforced.
// (Pattern from Elegora.)

const clientRoot = resolve(__dirname, "../..");
const read = (path: string) => readFileSync(resolve(clientRoot, path), "utf8");

describe("generated brand files", () => {
  for (const { path, contents } of BRAND_ARTIFACTS) {
    it(`${path} matches brand.ts`, () => {
      // Failing here means a brand value changed without `npm run brand:sync`
      // (or a dev/build), or someone edited a generated file by hand.
      expect(read(path)).toBe(contents());
    });
  }
});

describe("the Tailwind theme", () => {
  const css = brandThemeCss();

  it("declares every palette colour, radius, font and shadow", () => {
    for (const [key, value] of Object.entries(BRAND.colors)) expect(css).toContain(`--color-brand-${cssName(key)}: ${value};`);
    for (const [key, value] of Object.entries(BRAND.radius)) expect(css).toContain(`--radius-${key}: ${value};`);
    for (const [key, value] of Object.entries(BRAND.fonts)) expect(css).toContain(`--font-${key}: ${value};`);
    for (const [key, value] of Object.entries(BRAND.shadow)) expect(css).toContain(`--shadow-${key}: ${value};`);
  });

  it("publishes every theme token as a Tailwind colour", () => {
    for (const token of Object.keys(BRAND.themes.light)) {
      expect(css).toContain(`--color-${cssName(token)}: var(--brand-${cssName(token)});`);
    }
  });

  it("is imported by the stylesheet, which declares no brand value of its own", () => {
    const indexCss = read("src/index.css");
    expect(indexCss).toContain('@import "./brand.tokens.css"');
    expect(indexCss).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(indexCss).not.toMatch(/--(color|radius|font|shadow|ease)-[\w-]+:/);
  });

  it("only uses variables the brand defines", () => {
    const indexCss = read("src/index.css");
    const defined = new Set([...css.matchAll(/(--[\w-]+):/g)].map((m) => m[1]));
    for (const token of Object.keys(BRAND.themes.light)) defined.add(`--brand-${cssName(token)}`);
    const used = [...indexCss.matchAll(/var\((--(?:brand|color|radius|font|shadow|ease)-[\w-]+)\)/g)].map((m) => m[1]);
    expect(used.filter((v) => !defined.has(v))).toEqual([]);
  });
});

describe("no second source of truth", () => {
  it("states each palette colour in brand.ts and nowhere else", () => {
    const files = import.meta.glob("../**/*.{ts,tsx,css}", { eager: true, query: "?raw", import: "default" }) as Record<
      string,
      string
    >;
    // A sweep that matched nothing would pass for the wrong reason.
    expect(Object.keys(files).length).toBeGreaterThan(20);

    const allowed = ["brand.tokens.css", "globals/brand.ts", "brandArtifacts.ts", "brand.test.ts"];
    const offenders: string[] = [];
    for (const [path, source] of Object.entries(files)) {
      const normalized = path.replace(/^(\.\.?\/)+/, "globals/");
      if (allowed.some((a) => normalized.endsWith(a))) continue;
      for (const value of Object.values(BRAND.colors)) {
        if (value === "#FFFFFF") continue; // white is too common to police
        if (source.toLowerCase().includes(value.toLowerCase())) offenders.push(`${path} → ${value}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe("the light and dark themes", () => {
  it("keeps text readable in both (WCAG AA)", () => {
    const failures = checkContrast(BRAND.themes, [
      // Body and secondary text
      ["ink", "canvas"],
      ["ink", "surface"],
      ["ink", "sunken"],
      ["muted", "canvas"],
      ["muted", "surface"],
      ["muted", "sunken"],
      // Actions
      ["onPrimary", "primary"],
      ["onPrimary", "primaryDark"],
      ["onPrimary", "danger"],
      ["primary", "canvas"],
      ["primary", "primaryLight"],
      // Status text and tags
      ["accentDark", "canvas"],
      ["accentDark", "accentLight"],
      ["info", "canvas"],
      ["info", "infoLight"],
      ["warning", "canvas"],
      ["warning", "warningLight"],
      ["danger", "canvas"],
      ["danger", "dangerLight"],
      // Toast titles on the primary-coloured toast
      ["toastSuccess", "primary"],
      ["toastInfo", "primary"],
      ["toastError", "primary"],
      // Gold and forest bands
      ["goldText", "canvas"],
      ["goldText", "surface"],
      ["goldText", "goldLight"],
      ["onGold", "gold"],
      ["onBand", "band"],
      ["onBand", "bandRaised"],
      ["bandMuted", "band"],
      ["bandAccent", "band"],
      // Non-text: the mark and the focus ring must stand out (3:1); borders a floor
      ["mark", "canvas", 3],
      ["focus", "canvas", 3],
      ["line", "canvas", 1.2],
    ]);
    expect(failures).toEqual([]);
  });
});
