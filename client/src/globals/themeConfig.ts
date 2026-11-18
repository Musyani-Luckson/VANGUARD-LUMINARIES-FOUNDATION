import { createThemeConfig } from "../theme/config.ts";
import { BRAND } from "./brand.ts";

// ─── Theme config ─────────────────────────────────────────────────────────────
// Connects the brand palettes to the theme module (src/theme). This file, the
// <ThemeProvider> in AppProviders.tsx and themePlugin() in vite.config.ts are
// the only places the app touches the module. Remove those three and the app
// keeps working in the light theme.

export const THEME_CONFIG = createThemeConfig({
  themes: BRAND.themes,
  // Same variables vite.config.ts publishes for the light theme.
  cssVarPrefix: "brand",
  storageKey: `${BRAND.storagePrefix}:theme`,
  // Follow the device until the user picks.
  defaultMode: BRAND.defaultThemeMode,
  metaColorToken: "canvas",
});
