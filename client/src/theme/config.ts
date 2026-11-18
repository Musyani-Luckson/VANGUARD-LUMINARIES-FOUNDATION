import type { ThemeConfig, ThemeMode, ThemeName, ThemeTokens } from "./types.ts";

// ─── Theme module: config and CSS ─────────────────────────────────────────────
// Pure functions, safe to import from Node (vite.config) and the browser.

export const THEME_STYLE_ID = "theme-vars";
export const THEME_MODES: ThemeMode[] = ["light", "dark", "system"];

/** Colour values are written into a <style> tag, so only colour syntax is allowed. */
const SAFE_VALUE = /^[#a-zA-Z0-9(),.%\s/-]+$/;

/** "onPrimary" → "on-primary" */
export const kebab = (token: string) => token.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/** The CSS variable a token is published as: cssVar("brand", "onPrimary") → "--brand-on-primary". */
export const cssVar = (prefix: string, token: string) => `--${prefix}-${kebab(token)}`;

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && (THEME_MODES as string[]).includes(value);
}

/** Validates the config once, so mistakes show at start-up, not as odd colours. */
export function createThemeConfig<K extends string>(
  input: Omit<ThemeConfig<Record<K, string>>, "defaultMode"> & { defaultMode?: ThemeMode },
): ThemeConfig<Record<K, string>> {
  const light = Object.keys(input.themes.light).sort();
  const dark = Object.keys(input.themes.dark).sort();
  const missing = [...light.filter((k) => !dark.includes(k)), ...dark.filter((k) => !light.includes(k))];
  if (missing.length) throw new Error(`Theme tokens must match in light and dark; check: ${missing.join(", ")}`);

  for (const name of ["light", "dark"] as ThemeName[]) {
    for (const [token, value] of Object.entries(input.themes[name] as Record<string, string>)) {
      if (!SAFE_VALUE.test(value)) throw new Error(`Theme ${name}.${token} is not a colour: "${value}"`);
    }
  }
  if (!/^[a-z][a-z0-9-]*$/.test(input.cssVarPrefix)) throw new Error(`Invalid cssVarPrefix "${input.cssVarPrefix}"`);
  if (input.metaColorToken && !(input.metaColorToken in input.themes.light)) {
    throw new Error(`metaColorToken "${input.metaColorToken}" is not a theme token`);
  }

  return { ...input, defaultMode: input.defaultMode ?? "system" };
}

function declarations(prefix: string, tokens: ThemeTokens): string {
  return Object.entries(tokens)
    .map(([token, value]) => `${cssVar(prefix, token)}:${value};`)
    .join("");
}

/** Both themes as CSS variables, switched by <html data-theme="…">.
 *  Without the attribute (JS off), the device setting decides. */
export function themeStylesheet(config: ThemeConfig): string {
  const { cssVarPrefix: p, themes } = config;
  return [
    `:root,:root[data-theme="light"]{color-scheme:light;${declarations(p, themes.light)}}`,
    `:root[data-theme="dark"]{color-scheme:dark;${declarations(p, themes.dark)}}`,
    `@media (prefers-color-scheme: dark){:root:not([data-theme]){color-scheme:dark;${declarations(p, themes.dark)}}}`,
  ].join("\n");
}

/** Tiny script for <head>: sets data-theme before the first paint, so a dark
 *  theme never flashes light. Mirrors ThemeProvider's start-up logic. */
export function themeBootScript(config: ThemeConfig): string {
  const key = JSON.stringify(config.storageKey);
  const fallback = JSON.stringify(config.defaultMode);
  return `(function(){try{var m=localStorage.getItem(${key});if(m!=="light"&&m!=="dark"&&m!=="system")m=${fallback};var t=m==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):m;document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
}

/** The theme actually shown for a mode. */
export function resolveTheme(mode: ThemeMode, systemDark: boolean): ThemeName {
  return mode === "system" ? (systemDark ? "dark" : "light") : mode;
}
