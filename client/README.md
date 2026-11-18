# Vanguard Luminaries Foundation — client

The foundation's website: a static single-page app. Same structure as the
Upgraed client, with Elegora's generated-brand pipeline. No auth and no API yet.

## Stack

Vite 8 · React 19 (React Compiler) · TypeScript · React Router 7 (`react-router-dom`) ·
Tailwind CSS 4 · lucide-react · ESLint · Vitest

## Project structure

```
index.html                 HTML shell; %BRAND_*% placeholders filled from brand.ts
vite.config.ts             React Compiler, brand sync, brand HTML, theme, Tailwind
render.yaml                Render Static Site (publish dist/, rewrite /* → index.html)
scripts/
  brandSync.ts             Writes every file generated from brand.ts
  syncBrand.ts             `npm run brand:sync`
public/
  brand/                   Logo lockup, app icons, mark.svg (generated)
  favicon.ico
  site.webmanifest         (generated)
ref-assets/                Brand source material (palette card, PDFs, mock-ups)
src/
  main.tsx                 Entry: mounts <App />, imports index.css
  App.tsx                  AppProviders → AppRouter
  index.css                Tailwind, fonts, layout grid, brand utilities
  brand.tokens.css         GENERATED Tailwind @theme from brand.ts — don't edit
  router/
    AppRouter.tsx          Route table
  state-management/
    AppProviders.tsx       Composes every provider
    reducers/ contexts/ hooks/
                           One slice per feature (toast is the template)
  globals/
    brand.ts               THE source of truth: identity, logo, colours, fonts,
                           rounded corners, shadows, motion, theme behaviour
    brandArtifacts.ts      Builds the generated files from brand.ts
    themeConfig.ts         Connects the palettes to the theme module
    constants.ts           APP_NAME, ROUTES
    utils.ts               cx, browser storage, dates
  theme/                   Light / dark / system theming (self-contained module)
  components/              Design system (Button, Card, Badge, Modal, Toast, …),
                           BrandLogo, ThemeSwitcher, NotFound
  pages/                   One folder per area; dev/ holds previews
                           (/dev/foundation, /dev/components — dev server only)
```

### The brand

Everything brand-related is in `src/globals/brand.ts`, and reaches Tailwind
through the generated `src/brand.tokens.css`:

| In brand.ts | Tailwind classes |
| --- | --- |
| `colors` (gold, emerald, forest, white) | `bg-brand-gold`, `text-brand-forest`, … |
| `themes.light` / `themes.dark` | `bg-canvas`, `text-ink`, `bg-primary`, `text-gold-text`, `bg-band`, … (switch with the theme) |
| `radius` | `rounded-sm` … `rounded-3xl` |
| `fonts`, `tracking` | `font-sans` (Jost), `font-display` (Cormorant Garamond), `tracking-eyebrow` |
| `shadow` | `shadow-raised`, `shadow-floating`, `shadow-overlay` |
| `motion`, `focusRing`, `pattern` | `ease-brand`, and the `interactive`, `press`, `lift`, `rise-in`, `brand-pattern`, `eyebrow`, `tagline` utilities |

Change a value in `brand.ts`, then reload `npm run dev` (or run
`npm run brand:sync`). `npm test` fails if text becomes hard to read, if a
generated file is out of date, or if a brand colour is written anywhere else.

### Adding a page

1. Create it in `src/pages/<area>/`.
2. Add its path to `ROUTES` in `globals/constants.ts`.
3. Register a `<Route>` in `router/AppRouter.tsx`.

## Scripts

Run from this `client/` folder.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve `dist/` |
| `npm run lint` / `npm run typecheck` / `npm test` | Quality checks |
| `npm run brand:sync` | Rewrite the files generated from `brand.ts` |
| `npm run check` | Lint, type-check, test and build |

## Deploy (Render Static Site)

Root Directory `client` · Build `npm ci && npm run build` · Publish `dist` ·
rewrite `/*` → `/index.html`. See `render.yaml`.
