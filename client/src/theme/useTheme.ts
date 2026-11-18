import { createContext, useCallback, useContext, type Dispatch } from "react";
import { resolveTheme } from "./config.ts";
import type { ThemeAction, ThemeState } from "./themeReducer.ts";
import type { ThemeConfig, ThemeMode, ThemeName, ThemeTokens } from "./types.ts";

// ─── Theme module: hook ───────────────────────────────────────────────────────
//   const { mode, theme, setMode, toggle, tokens } = useTheme();
//   setMode("dark") · setMode("system") · toggle() flips light ↔ dark
// `tokens` are the shown theme's colours, for code that can't use CSS
// (canvas charts, maps, third-party widgets).

export interface ThemeContextValue {
  state: ThemeState;
  dispatch: Dispatch<ThemeAction>;
  config: ThemeConfig;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme<T extends ThemeTokens = ThemeTokens>() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  const { state, dispatch, config } = ctx;
  const theme: ThemeName = resolveTheme(state.mode, state.systemDark);

  const setMode = useCallback((mode: ThemeMode) => dispatch({ type: "THEME_SET_MODE", mode }), [dispatch]);
  const toggle = useCallback(
    () => dispatch({ type: "THEME_SET_MODE", mode: theme === "dark" ? "light" : "dark" }),
    [dispatch, theme],
  );

  return { mode: state.mode, theme, setMode, toggle, tokens: config.themes[theme] as T };
}
