// ─── Brand ────────────────────────────────────────────────────────────────────
// THE single source of truth for Vanguard Luminaries Foundation: name and
// copy, logo, colours, fonts, rounded corners, shadows, motion and theme
// behaviour. Nothing else in the app states a brand value.
//
// How it reaches the app (same pattern as Upgraed / Elegora):
//   brand.ts ─► globals/brandArtifacts.ts writes src/brand.tokens.css (the
//               Tailwind @theme: bg-brand-gold, bg-canvas, rounded-md,
//               font-display, shadow-raised, ease-brand, …) and
//               public/site.webmanifest — on `npm run dev`/`build` and with
//               `npm run brand:sync`
//            ─► globals/themeConfig.ts + theme/ publish the light/dark tokens
//               as --brand-* variables and switch them (vite.config.ts inlines
//               them into index.html, so there is no flash)
//            ─► vite.config.ts fills the %BRAND_*% placeholders in index.html
//
// Keep this file free of browser/Vite-only APIs: Node imports it too.
// globals/brand.test.ts checks contrast in both themes, that the generated
// files are in sync, and that no other file restates a brand colour.
//
// Sources (client/ref-assets): the palette card, the vision statement PDF
// (Cormorant Garamond + Jost, tracked eyebrows, V pattern at ~4% opacity), the
// merchandise mock-ups (forest fields, gold mark, generously rounded tiles).

export const BRAND = {
  // ── Identity ────────────────────────────────────────────────────────────────
  name: "Vanguard Luminaries Foundation",
  /** ≤ 12 characters — home-screen label, tight headers. */
  shortName: "Vanguard",
  /** Initialism for very tight spaces (avatars). */
  initials: "VLF",
  /** The brand line, always in the display italic. */
  tagline: "Rising above the degree.",
  /** Shown as a tracked eyebrow: LEADERSHIP · MINDSET · PURPOSE. */
  pillars: ["Leadership", "Mindset", "Purpose"],
  motto: "Fulfilling our purpose.",
  description:
    "Vanguard Luminaries Foundation equips people to know their purpose and gives them the tools to act on it, through leadership training, mindset transformation, master classes and outreach.",
  vision: {
    headline: "A generation that leads from purpose, not paper.",
    body: "We exist to help people see past the certificate in their hand and into the capability already inside them. A qualification opens a door, but it was never meant to be the ceiling. Vanguard Luminaries Foundation walks with individuals as they step outside what is comfortable, familiar and safe, and begin to actualise the fuller potential they were built to carry.",
  },
  mission: {
    headline: "Equip people to know their purpose, and give them the tools to act on it.",
    body: "Through leadership development and mindset transformation, we help people move from being defined by a title to being driven by a calling. We create the spaces, conversations and training that turn potential into intention, and intention into motion.",
  },
  values: ["Integrity", "Professionalism", "Excellence", "Accountability", "Service", "Innovation", "Leadership"],
  programmes: [
    { name: "Leadership Training", summary: "Practical development for people ready to lead themselves before they lead others." },
    { name: "Mindset Transformation", summary: "Reframing comfort, fear and certainty so people can move toward what they were made for." },
    { name: "Master Classes", summary: "Focused sessions led by practitioners, built around real skill and real application." },
    { name: "Seminars & Webinars", summary: "Ongoing gatherings, in person and online, that keep the conversation on purpose alive." },
    { name: "School & Career Outreach", summary: "Direct engagement with students, helping them weigh career choices against calling, not just convention." },
  ],

  /** BCP 47 locale for number/date formatting. */
  locale: "en-ZM",
  /** Canonical public origin for share previews. Empty until the domain is
   *  decided; og:url / og:image are left out of index.html while empty. */
  url: "",
  /** localStorage key prefix, so keys never collide with other apps. */
  storagePrefix: "VLF",

  // ── Logo ────────────────────────────────────────────────────────────────────
  // Files in /public/brand. mark.svg is a vector redraw of the mark (99% overlap
  // with the original); the PNGs were extracted losslessly from the vision PDF.
  logo: {
    /** The mark alone, vector, gold. */
    mark: "/brand/mark.svg",
    /** Gold mark + white wordmark — forest/dark backgrounds only. */
    lockupOnDark: "/brand/lockup.png",
    /** Square app icons: gold mark on forest. */
    icon: "/brand/icon-512.png",
    icon192: "/brand/icon-192.png",
    appleTouch: "/brand/apple-touch-icon.png",
    favicon: "/favicon.ico",
    alt: "Vanguard Luminaries Foundation",
    /** The mark's geometry. <BrandMark>, the pattern and mark.svg use it. */
    markViewBox: "0 0 590 496",
    markPoints:
      "0,76 70,7 289,111 521,0 590,61 338,496 236,496 440,140 286,210 142,141 221,279 250,240 352,240 223,462",
  },

  // ── Palette ─────────────────────────────────────────────────────────────────
  // The four brand colours exactly as on the palette card. The same in every
  // theme: bg-brand-gold, text-brand-forest, … UI code should prefer the
  // semantic theme tokens below.
  colors: {
    gold: "#FFDCA0",
    emerald: "#007761",
    forest: "#002A22",
    white: "#FFFFFF",
  },

  // ── Theme tokens ────────────────────────────────────────────────────────────
  // What a colour is FOR, per theme: bg-canvas, text-ink, bg-primary, … Same
  // names in both themes (the components use these names). Light is the
  // default; dark is the brand-native look of the vision statement.
  themes: {
    light: {
      /** Page and card background. */
      canvas: "#ffffff",
      /** Raised bands: footer, alternating sections, row hover (warm cream). */
      surface: "#fbf7ef",
      /** Inputs, placeholders, skeletons, hover fills. */
      sunken: "#f4eee2",
      /** Borders and dividers. */
      line: "#e4dccb",
      /** Body text — the brand forest. */
      ink: "#002A22",
      /** Secondary text. */
      muted: "#4d6159",

      /** Main actions, links, active navigation — the brand emerald. */
      primary: "#007761",
      /** Hover/pressed shade of primary. */
      primaryDark: "#005e4d",
      /** Tinted fill behind primary content (selected chips, ghost hover). */
      primaryLight: "#e2f2ed",
      /** Text and icons on primary and danger fills. */
      onPrimary: "#ffffff",

      /** Success / positive. accentDark is the text shade. */
      accent: "#16a34a",
      accentDark: "#15803d",
      accentLight: "#dcfce7",
      info: "#1d4ed8",
      infoLight: "#dbeafe",
      warning: "#b45309",
      warningLight: "#fef3c7",
      danger: "#b91c1c",
      dangerLight: "#fee2e2",
      /** Toast titles, on the primary-coloured toast. */
      toastSuccess: "#bbf7d0",
      toastInfo: "#dbeafe",
      toastError: "#ffe4e6",

      /** The brand gold as a fill (highlights, rules). Not for text on light. */
      gold: "#FFDCA0",
      /** Gold as readable text on light (eyebrows, quotes). */
      goldText: "#7d5410",
      goldLight: "#fff4e0",
      onGold: "#002A22",

      /** Deep forest bands (hero, footer) — forest in both themes. */
      band: "#002A22",
      bandRaised: "#0a3a30",
      onBand: "#f6f1e7",
      bandMuted: "#a9bdb6",
      bandAccent: "#FFDCA0",

      /** The mark on canvas: gold disappears on white, so emerald on light. */
      mark: "#007761",
      /** Keyboard focus ring. */
      focus: "#007761",
      /** The repeating V pattern (opacity in BRAND.pattern). */
      pattern: "#007761",

      /** Dims the page behind dialogs and sheets. */
      overlay: "rgb(0 42 34 / 0.5)",
    },
    dark: {
      canvas: "#002A22",
      surface: "#04332a",
      sunken: "#0a3d33",
      line: "#1e5446",
      ink: "#f6f1e7",
      muted: "#a9bdb6",

      // On forest the gold leads, as in the vision statement. "Dark" here is
      // the hover shade, which is lighter on a dark page.
      primary: "#FFDCA0",
      primaryDark: "#ffe8c2",
      primaryLight: "#133f35",
      onPrimary: "#002A22",

      accent: "#22c55e",
      accentDark: "#86efac",
      accentLight: "#0f2e1c",
      info: "#93c5fd",
      infoLight: "#132a45",
      warning: "#fbbf24",
      warningLight: "#33260a",
      danger: "#fca5a5",
      dangerLight: "#3a1517",
      toastSuccess: "#166534",
      toastInfo: "#1d4ed8",
      toastError: "#b91c1c",

      gold: "#FFDCA0",
      goldText: "#FFDCA0",
      goldLight: "#1b3a2e",
      onGold: "#002A22",

      band: "#001d17",
      bandRaised: "#04332a",
      onBand: "#f6f1e7",
      bandMuted: "#a9bdb6",
      bandAccent: "#FFDCA0",

      mark: "#FFDCA0",
      focus: "#FFDCA0",
      pattern: "#FFDCA0",

      overlay: "rgb(0 0 0 / 0.6)",
    },
  },

  // ── Typography ──────────────────────────────────────────────────────────────
  // From the vision statement: Cormorant Garamond for headings and the italic
  // tagline, Jost (light) for body and tracked eyebrows. Self-hosted with
  // @fontsource-variable (imported in index.css). → font-sans, font-display
  fonts: {
    sans: '"Jost Variable", Jost, ui-sans-serif, system-ui, sans-serif',
    display: '"Cormorant Garamond Variable", "Cormorant Garamond", Georgia, "Times New Roman", serif',
  },
  /** Letter-spacing for eyebrows (L E A D E R S H I P). → tracking-eyebrow */
  tracking: { eyebrow: "0.3em", display: "0.01em" },

  // ── Rounded corners ─────────────────────────────────────────────────────────
  // These ARE Tailwind's radius keys, so every rounded-* utility resolves
  // through the brand. Soft, generous corners on tiles and media (as in the
  // mock-ups), quieter ones on controls; the mark itself is sharp.
  radius: {
    /** Checkboxes, kbd, small inner elements. */
    sm: "6px",
    /** Buttons, inputs, selects. */
    md: "12px",
    /** Menus, popovers, small cards. */
    lg: "16px",
    /** Cards and panels. */
    xl: "20px",
    /** Dialogs and sheets. */
    "2xl": "24px",
    /** Images, mock-up tiles, hero bands. */
    "3xl": "28px",
  },

  // ── Elevation ───────────────────────────────────────────────────────────────
  // Forest-tinted and soft; prefer borders, shadow only for things that float.
  // → shadow-raised, shadow-floating, shadow-overlay
  shadow: {
    raised: "0 1px 2px rgb(0 42 34 / 0.06), 0 4px 12px rgb(0 42 34 / 0.06)",
    floating: "0 8px 24px rgb(0 42 34 / 0.12), 0 2px 6px rgb(0 42 34 / 0.08)",
    overlay: "0 24px 64px rgb(0 20 16 / 0.28)",
  },

  // ── Motion & behaviour ──────────────────────────────────────────────────────
  // Calm and deliberate: short fades and small rises, never bounces. All of it
  // is switched off under prefers-reduced-motion (index.css).
  // → ease-brand / ease-enter / ease-exit; the rest as --brand-* variables
  //   used by the interactive / press / lift / rise-in utilities.
  motion: {
    ease: {
      /** Hovers, colour and opacity. */
      brand: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      /** Things entering: content rising in, dialogs opening. */
      enter: "cubic-bezier(0.16, 1, 0.3, 1)",
      /** Things leaving. */
      exit: "cubic-bezier(0.4, 0, 1, 1)",
    },
    duration: { fast: "140ms", base: "220ms", slow: "420ms" },
    /** Hover lift for clickable cards. */
    hoverLift: "-2px",
    /** Press feedback for buttons. */
    pressScale: "0.98",
    /** Distance content rises when it enters. */
    enterRise: "8px",
  },

  focusRing: { width: "2px", offset: "3px" },

  /** The repeating V mark used as a background texture (brand-pattern). */
  pattern: { opacity: "0.05", size: "72px" },

  /** Follow the device until the visitor picks light or dark. */
  defaultThemeMode: "system",
} as const;

// Browser chrome colours (<meta name="theme-color">, manifest).
export const THEME_COLOR = BRAND.themes.light.canvas;
export const THEME_COLOR_DARK = BRAND.themes.dark.canvas;
export const BACKGROUND_COLOR = BRAND.themes.light.canvas;
