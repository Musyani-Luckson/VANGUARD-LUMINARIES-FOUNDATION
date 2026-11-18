import type { Plugin } from "vite";
import { THEME_STYLE_ID, themeBootScript, themeStylesheet } from "./config.ts";
import type { ThemeConfig } from "./types.ts";

// ─── Theme module: Vite plugin (optional) ─────────────────────────────────────
// Inlines the theme variables and a pre-paint script into index.html, so the
// right theme shows on the very first frame. Without it ThemeProvider still
// works, but a dark-mode visitor may see one light frame while JS loads.
//   plugins: [themePlugin(THEME_CONFIG)]

export function themePlugin(config: ThemeConfig): Plugin {
  return {
    name: "theme",
    transformIndexHtml: () => [
      { tag: "style", attrs: { id: THEME_STYLE_ID }, children: themeStylesheet(config), injectTo: "head-prepend" },
      { tag: "script", children: themeBootScript(config), injectTo: "head-prepend" },
    ],
  };
}
