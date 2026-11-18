# Theme module

Light, dark and "follow the device" theming for any React + Vite app. Self-contained:
nothing in this folder imports from the host app, so it can be copied into another
project or removed without touching anything else.

**What it does**

- Publishes your colour tokens as CSS variables (`--<prefix>-<token>`) for both themes.
- Sets `<html data-theme="light|dark">` and the browser's `color-scheme`, so native
  controls and scrollbars match.
- Defaults to the device setting and follows it live; remembers the user's choice.
- Updates `<meta name="theme-color">` (the mobile browser bar).
- Optional Vite plugin sets the theme before the first paint (no light flash).
- Switches without colour transitions animating across the whole page.
- `checkContrast` lets a test fail when a palette edit makes text hard to read.

State follows the reducer → context → hook pattern: `themeReducer.ts`,
`ThemeProvider.tsx`, `useTheme.ts`.

## Add it to an app

1. **Tokens.** Define the same token names for both themes; values are colours.

   ```ts
   export const THEME_CONFIG = createThemeConfig({
     themes: { light: { canvas: "#ffffff", ink: "#111827" }, dark: { canvas: "#0f141c", ink: "#e7eaf0" } },
     cssVarPrefix: "brand",            // → --brand-canvas, --brand-ink
     storageKey: "MYAPP:theme",
     defaultMode: "system",            // optional, the default
     metaColorToken: "canvas",         // optional
   });
   ```

2. **Provider.** Wrap the app once: `<ThemeProvider config={THEME_CONFIG}>…</ThemeProvider>`.

3. **Use the variables** in CSS. With Tailwind v4:

   ```css
   @theme inline {
     --color-canvas: var(--brand-canvas);
     --color-ink: var(--brand-ink);
   }
   ```

   Then `bg-canvas text-ink` follow the theme. Never hard-code `bg-white` or `text-black`.

4. **Optional: no-flash plugin** in `vite.config.ts` (import from `src/theme/vite.ts`):
   `plugins: [themePlugin(THEME_CONFIG)]`.

5. **A control:** `const { mode, setMode, theme, toggle, tokens } = useTheme();`

## Remove it

Delete the `<ThemeProvider>` wrapper, the `themePlugin(...)` line and your config file,
then this folder. The app keeps whatever base variables it publishes itself. In Upgraed,
`vite.config.ts` always publishes the light palette, so it stays in the light theme.

## API

| Export | Purpose |
| --- | --- |
| `createThemeConfig(input)` | Validates tokens (same names in both themes, colour syntax only) and fills defaults |
| `ThemeProvider` | Applies the theme, follows the device, remembers the choice |
| `useTheme()` | `{ mode, theme, setMode, toggle, tokens }` |
| `themeStylesheet(config)` / `themeBootScript(config)` | The CSS and pre-paint script, for non-Vite setups |
| `themePlugin(config)` (`theme/vite.ts`) | Inlines both into `index.html` |
| `contrastRatio(a, b)` / `checkContrast(themes, pairs)` | WCAG contrast checks for tests |
