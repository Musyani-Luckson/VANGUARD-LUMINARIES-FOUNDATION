import { describe, expect, it } from "vitest";
import { createThemeConfig, cssVar, resolveTheme, themeBootScript, themeStylesheet } from "./config";
import { checkContrast, contrastRatio } from "./contrast";
import { themeReducer } from "./themeReducer";

const themes = {
  light: { canvas: "#ffffff", ink: "#111827", onPrimary: "#ffffff" },
  dark: { canvas: "#0f141c", ink: "#e7eaf0", onPrimary: "#0f141c" },
};
const config = createThemeConfig({ themes, cssVarPrefix: "brand", storageKey: "APP:theme" });

describe("theme config", () => {
  it("names variables from tokens", () => {
    expect(cssVar("brand", "onPrimary")).toBe("--brand-on-primary");
    expect(cssVar("app", "canvas")).toBe("--app-canvas");
  });

  it("defaults to following the device", () => {
    expect(config.defaultMode).toBe("system");
  });

  it("rejects themes whose tokens don't match (TypeScript catches this too; this covers untyped input)", () => {
    const mismatched: Record<"light" | "dark", Record<string, string>> = { light: { canvas: "#fff", ink: "#000" }, dark: { canvas: "#000" } };
    expect(() => createThemeConfig({ themes: mismatched, cssVarPrefix: "x", storageKey: "k" })).toThrow(/ink/);
  });

  it("rejects values that aren't colours (they end up in a <style> tag)", () => {
    expect(() =>
      createThemeConfig({ themes: { light: { canvas: "red;}body{display:none" }, dark: { canvas: "#000" } }, cssVarPrefix: "x", storageKey: "k" }),
    ).toThrow(/not a colour/);
  });

  it("writes both themes, switched by data-theme, with a device fallback", () => {
    const css = themeStylesheet(config);
    expect(css).toContain(':root,:root[data-theme="light"]{color-scheme:light;--brand-canvas:#ffffff;');
    expect(css).toContain(':root[data-theme="dark"]{color-scheme:dark;--brand-canvas:#0f141c;');
    expect(css).toContain("@media (prefers-color-scheme: dark){:root:not([data-theme])");
  });

  it("boot script reads the configured key and falls back to the default", () => {
    const script = themeBootScript(config);
    expect(script).toContain('localStorage.getItem("APP:theme")');
    expect(script).toContain('m="system"');
  });

  it("resolves system mode from the device", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme("light", true)).toBe("light");
  });
});

describe("themeReducer", () => {
  it("sets the mode and tracks the device, returning the same state when nothing changes", () => {
    const s0 = { mode: "system" as const, systemDark: false };
    const s1 = themeReducer(s0, { type: "THEME_SET_MODE", mode: "dark" });
    expect(s1.mode).toBe("dark");
    expect(themeReducer(s1, { type: "THEME_SET_MODE", mode: "dark" })).toBe(s1);
    expect(themeReducer(s1, { type: "THEME_SYSTEM_CHANGED", systemDark: true }).systemDark).toBe(true);
  });
});

describe("contrast", () => {
  it("computes WCAG ratios", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
    expect(contrastRatio("#ffffff", "#ffffff")).toBe(1);
  });

  it("reports failing pairs per theme", () => {
    expect(checkContrast(themes, [["ink", "canvas"]])).toEqual([]);
    const fails = checkContrast({ light: { a: "#777777", b: "#888888" }, dark: { a: "#000000", b: "#ffffff" } }, [["a", "b"]]);
    expect(fails).toHaveLength(1);
    expect(fails[0].theme).toBe("light");
  });
});
