import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type HtmlTagDescriptor, type Plugin } from "vite";

import { BRAND, THEME_COLOR, THEME_COLOR_DARK } from "./src/globals/brand.ts";
import { THEME_CONFIG } from "./src/globals/themeConfig.ts";
import { themePlugin } from "./src/theme/vite.ts";
import { syncBrand } from "./scripts/brandSync.ts";

// The Tailwind theme (src/brand.tokens.css), the web manifest and the mark SVG
// are written from brand.ts. Doing it on dev/build as well as with
// `npm run brand:sync` means editing a brand value and reloading is enough.
const brandSync: Plugin = {
  name: "brand-sync",
  buildStart() {
    const written = syncBrand();
    if (written.length) console.log(`brand: wrote ${written.join(", ")}`);
  },
};

// Fills the %BRAND_*% placeholders in index.html from brand.ts, and adds the
// share-preview tags that need an absolute URL once BRAND.url is set.
const brandHtml: Plugin = {
  name: "brand-html",
  transformIndexHtml(html) {
    const tags: HtmlTagDescriptor[] = BRAND.url
      ? [
          { tag: "meta", attrs: { property: "og:url", content: BRAND.url }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:image", content: `${BRAND.url}${BRAND.logo.icon}` }, injectTo: "head" },
          { tag: "meta", attrs: { property: "og:image:alt", content: BRAND.logo.alt }, injectTo: "head" },
          { tag: "meta", attrs: { name: "twitter:image", content: `${BRAND.url}${BRAND.logo.icon}` }, injectTo: "head" },
        ]
      : [];
    return {
      html: html
        .replaceAll("%BRAND_NAME%", BRAND.name)
        .replaceAll("%BRAND_SHORT_NAME%", BRAND.shortName)
        .replaceAll("%BRAND_TITLE%", `${BRAND.name} — ${BRAND.tagline}`)
        .replaceAll("%BRAND_DESCRIPTION%", BRAND.description)
        .replaceAll("%BRAND_LANG%", BRAND.locale.split("-")[0])
        .replaceAll("%BRAND_THEME_COLOR_DARK%", THEME_COLOR_DARK)
        .replaceAll("%BRAND_THEME_COLOR%", THEME_COLOR)
        .replaceAll("%BRAND_FAVICON%", BRAND.logo.favicon)
        .replaceAll("%BRAND_MARK%", BRAND.logo.mark)
        .replaceAll("%BRAND_APPLE_TOUCH%", BRAND.logo.appleTouch),
      tags,
    };
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    brandSync,
    brandHtml,
    // Inlines both themes' --brand-* variables and a pre-paint script, so a
    // dark-mode visitor never sees one light frame while the bundle loads.
    themePlugin(THEME_CONFIG),
    tailwindcss(),
  ],
});
