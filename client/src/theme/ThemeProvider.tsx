import { useEffect, useReducer, type ReactNode } from "react";
import { THEME_STYLE_ID, isThemeMode, resolveTheme, themeStylesheet } from "./config.ts";
import { themeReducer, type ThemeState } from "./themeReducer.ts";
import { ThemeContext } from "./useTheme.ts";
import type { ThemeConfig } from "./types.ts";

// ─── Theme module: provider ───────────────────────────────────────────────────
// Wrap the app once: <ThemeProvider config={THEME_CONFIG}>…</ThemeProvider>.
// It publishes the theme tokens as CSS variables (unless the Vite plugin
// already did), sets <html data-theme>, keeps the browser's colour-scheme and
// theme-color in step, remembers the choice and follows the device when the
// mode is "system".

const DARK_QUERY = "(prefers-color-scheme: dark)";

function readMode(config: ThemeConfig) {
  try {
    const stored = window.localStorage.getItem(config.storageKey);
    return isThemeMode(stored) ? stored : config.defaultMode;
  } catch {
    return config.defaultMode; // storage blocked (private mode, policy)
  }
}

function initState(config: ThemeConfig): ThemeState {
  const systemDark = typeof window !== "undefined" && !!window.matchMedia?.(DARK_QUERY).matches;
  return { mode: typeof window === "undefined" ? config.defaultMode : readMode(config), systemDark };
}

/** Switch without every element animating its colours at once. */
function withoutTransitions(apply: () => void) {
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);
  apply();
  void document.body.offsetHeight; // flush styles before transitions return
  style.remove();
}

export function ThemeProvider({ config, children }: { config: ThemeConfig; children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, config, initState);
  const theme = resolveTheme(state.mode, state.systemDark);

  // Publish the variables once, if the Vite plugin didn't inline them.
  useEffect(() => {
    if (document.getElementById(THEME_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = THEME_STYLE_ID;
    style.textContent = themeStylesheet(config);
    document.head.prepend(style);
  }, [config]);

  // Follow the device setting.
  useEffect(() => {
    const query = window.matchMedia?.(DARK_QUERY);
    if (!query) return;
    const onChange = (e: MediaQueryListEvent) => dispatch({ type: "THEME_SYSTEM_CHANGED", systemDark: e.matches });
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Apply the shown theme.
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
      const token = config.metaColorToken;
      if (token) {
        document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", config.themes[theme][token]));
      }
    };
    if (root.getAttribute("data-theme") === theme) apply();
    else withoutTransitions(apply);
  }, [theme, config]);

  // Remember the choice.
  useEffect(() => {
    try {
      window.localStorage.setItem(config.storageKey, state.mode);
    } catch {
      // Not remembered; the theme still applies for this visit.
    }
  }, [state.mode, config.storageKey]);

  return <ThemeContext.Provider value={{ state, dispatch, config }}>{children}</ThemeContext.Provider>;
}
