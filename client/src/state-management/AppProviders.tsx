import type { ReactNode } from "react";

import { ThemeProvider } from "../theme";
import { THEME_CONFIG } from "../globals/themeConfig";
import { ToastProvider } from "./contexts/toastContext";

// ── AppProviders ──────────────────────────────────────────────────────────────
// Every app-wide context provider, composed once and wrapped around the router
// in App.tsx. Add a slice's provider here when you create one
// (reducers/ → contexts/ → hooks/, with the toast slice as the template).
// ThemeProvider is outermost and independent: remove it (with
// globals/themeConfig.ts and themePlugin in vite.config.ts) to drop theming.

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider config={THEME_CONFIG}>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
