// ─── Theme module: types ──────────────────────────────────────────────────────
// Stand-alone: nothing in src/theme imports from the host app.

export type ThemeName = "light" | "dark";

/** What the user chose. "system" follows the device setting. */
export type ThemeMode = ThemeName | "system";

/** Token name (camelCase) → CSS colour. Both themes define the same tokens. */
export type ThemeTokens = Record<string, string>;

export interface ThemeConfig<T extends ThemeTokens = ThemeTokens> {
  themes: Record<ThemeName, T>;
  /** Tokens become CSS variables --<prefix>-<kebab-token>, e.g. --brand-on-primary. */
  cssVarPrefix: string;
  /** localStorage key for the chosen mode. */
  storageKey: string;
  defaultMode: ThemeMode;
  /** Token painted into <meta name="theme-color"> (mobile browser UI).
   *  Checked against the tokens by createThemeConfig. */
  metaColorToken?: string;
}
