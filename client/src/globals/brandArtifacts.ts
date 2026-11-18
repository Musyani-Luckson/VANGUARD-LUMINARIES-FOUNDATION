// ─── Generated-from-brand artifacts ──────────────────────────────────────────
// Things that need brand values but cannot import brand.ts get a file written
// from here instead of a second hand-maintained copy:
//   • src/brand.tokens.css — Tailwind compiles CSS and never reads TypeScript
//   • public/site.webmanifest — served as-is by the static host
//
// Pure string building, no file system — so the sync script, the Vite plugin
// and the drift test all produce the same bytes from the same input.
// (Pattern from Elegora.)

import { BRAND, BACKGROUND_COLOR, THEME_COLOR } from "./brand.ts";

const warning = (source: string, style: "css" | "json"): string => {
  const lines = [
    "GENERATED FILE — DO NOT EDIT.",
    `Written from ${source} by \`npm run brand:sync\` (and by vite dev/build).`,
    "Change a brand value there; this file follows.",
  ];
  return style === "css" ? ["/*", ...lines.map((l) => ` * ${l}`), " */"].join("\n") : "";
};

/** camelCase as written in brand.ts → the kebab-case a CSS custom property wants. */
export const cssName = (key: string): string => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const decl = (prefix: string, entries: Record<string, string>) =>
  Object.entries(entries).map(([key, value]) => `  --${prefix}-${cssName(key)}: ${value};`);

/** The mark as a CSS mask image, so the pattern takes its colour from a token. */
function markUrl(): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${BRAND.logo.markViewBox}'><polygon points='${BRAND.logo.markPoints}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * The Tailwind theme. `--color-*`, `--radius-*`, `--font-*`, `--shadow-*`,
 * `--tracking-*` and `--ease-*` are Tailwind v4 theme keys, so declaring them
 * here is what makes `bg-brand-gold`, `bg-canvas`, `rounded-md`, `font-display`
 * and `ease-brand` mean what brand.ts says.
 */
export function brandThemeCss(): string {
  // Theme surfaces point at the live --brand-* variables, which the theme
  // module swaps when the theme changes: `bg-canvas` compiles once and means
  // white or forest depending on the theme.
  const surfaces = Object.keys(BRAND.themes.light).map(
    (key) => `  --color-${cssName(key)}: var(--brand-${cssName(key)});`,
  );
  const m = BRAND.motion;
  return [
    warning("src/globals/brand.ts", "css"),
    "",
    "@theme {",
    "  /* Palette: the brand's colours, the same in every theme */",
    ...decl("color-brand", BRAND.colors),
    "",
    "  /* Rounded corners: every rounded-* utility resolves through these */",
    ...decl("radius", BRAND.radius),
    "",
    "  /* Type */",
    ...decl("font", BRAND.fonts),
    ...decl("tracking", BRAND.tracking),
    "",
    "  /* Elevation */",
    ...decl("shadow", BRAND.shadow),
    "",
    "  /* Motion easing */",
    ...decl("ease", m.ease),
    "}",
    "",
    "/* Surfaces: what a colour is FOR, which the theme decides */",
    "@theme inline {",
    ...surfaces,
    "}",
    "",
    "/* Behaviour values used by the utilities in index.css */",
    ":root {",
    ...decl("brand-duration", m.duration),
    `  --brand-hover-lift: ${m.hoverLift};`,
    `  --brand-press-scale: ${m.pressScale};`,
    `  --brand-enter-rise: ${m.enterRise};`,
    `  --brand-focus-width: ${BRAND.focusRing.width};`,
    `  --brand-focus-offset: ${BRAND.focusRing.offset};`,
    `  --brand-pattern-opacity: ${BRAND.pattern.opacity};`,
    `  --brand-pattern-size: ${BRAND.pattern.size};`,
    `  --brand-pattern-url: ${markUrl()};`,
    "}",
    "",
  ].join("\n");
}

/** The web app manifest (name, colours, icons) for the static host. */
export function webManifest(): string {
  const manifest = {
    name: BRAND.name,
    short_name: BRAND.shortName,
    description: BRAND.description,
    lang: BRAND.locale,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: BRAND.logo.icon192, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: BRAND.logo.icon, sizes: "512x512", type: "image/png", purpose: "any maskable" },
      { src: BRAND.logo.mark, sizes: "any", type: "image/svg+xml" },
    ],
  };
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

/** The mark as a standalone SVG file (public/brand/mark.svg). */
export function markSvg(): string {
  const { markViewBox, markPoints, alt } = BRAND.logo;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${markViewBox}" role="img" aria-label="${alt}"><polygon fill="${BRAND.colors.gold}" points="${markPoints}"/></svg>\n`;
}

/** Every generated file, as a path relative to the client package. */
export const BRAND_ARTIFACTS: ReadonlyArray<{ path: string; contents: () => string }> = [
  { path: "src/brand.tokens.css", contents: brandThemeCss },
  { path: "public/site.webmanifest", contents: webManifest },
  { path: "public/brand/mark.svg", contents: markSvg },
];
