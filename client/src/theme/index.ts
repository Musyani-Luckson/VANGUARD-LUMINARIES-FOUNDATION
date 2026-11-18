// ─── Theme module: public API ─────────────────────────────────────────────────
// Import from "src/theme" in the app. The Vite plugin lives in "theme/vite.ts"
// (Node only) and is imported from vite.config.ts directly.

export { ThemeProvider } from "./ThemeProvider.tsx";
export { useTheme } from "./useTheme.ts";
export { createThemeConfig, cssVar, resolveTheme, themeStylesheet, themeBootScript, THEME_MODES } from "./config.ts";
export { contrastRatio, checkContrast, type ContrastFailure } from "./contrast.ts";
export type { ThemeConfig, ThemeMode, ThemeName, ThemeTokens } from "./types.ts";
