import React from "react";
import BrandLogo, { BrandMark } from "../../components/BrandLogo";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { BRAND } from "../../globals/brand";
import { cssName } from "../../globals/brandArtifacts";
import { ROUTES } from "../../globals/constants";

// ─── Foundation preview (development only) ───────────────────────────────────
// The brand as the app actually uses it: palette, theme tokens, type, rounded
// corners, elevation and motion — all read from globals/brand.ts. Registered
// in AppRouter only when import.meta.env.DEV.

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 border-t border-line pt-6">
      <h2 className="text-2xl">{title}</h2>
      {children}
    </section>
  );
}

// Tailwind only generates classes it can see written out, so each radius and
// shadow class is listed literally.
const RADIUS_CLASSES: Record<keyof typeof BRAND.radius, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};
const SHADOW_CLASSES: Record<keyof typeof BRAND.shadow, string> = {
  raised: "shadow-raised",
  floating: "shadow-floating",
  overlay: "shadow-overlay",
};

function FoundationPage() {
  return (
    <div className="min-h-dvh py-8">
      <div className="page-container space-y-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-gold-text">Development</p>
            <h1 className="text-4xl">Foundation</h1>
            <p className="text-sm text-muted">
              Everything below is read from <code>src/globals/brand.ts</code> ·{" "}
              <a href={ROUTES.DEV_COMPONENTS} className="text-info underline">
                components
              </a>
            </p>
          </div>
          <ThemeSwitcher />
        </header>

        <Section title="Logo">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="brand-pattern flex aspect-[4/3] items-center justify-center rounded-3xl bg-band p-8">
              <img src={BRAND.logo.lockupOnDark} alt={BRAND.logo.alt} className="w-full max-w-60" />
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-line p-8 text-ink">
              <BrandLogo />
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-3xl bg-gold p-8 text-on-gold">
              <BrandMark className="h-24" color="currentColor" />
            </div>
          </div>
        </Section>

        <Section title="Palette">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Object.entries(BRAND.colors).map(([name, hex]) => (
              <div key={name} className="overflow-hidden rounded-xl border border-line">
                <div className="h-24" style={{ background: `var(--color-brand-${name})` }} />
                <p className="px-3 pt-2 text-sm font-medium">brand-{name}</p>
                <p className="px-3 pb-3 text-xs text-muted">{hex}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Theme tokens">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Object.keys(BRAND.themes.light).map((token) => (
              <div key={token} className="flex items-center gap-3 rounded-md border border-line p-2">
                <span
                  className="h-9 w-9 shrink-0 rounded-sm border border-line"
                  style={{ background: `var(--brand-${cssName(token)})` }}
                />
                <span className="truncate text-sm">{cssName(token)}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <p className="eyebrow text-gold-text">{BRAND.pillars.join("  ·  ")}</p>
          <p className="font-display text-5xl">{BRAND.vision.headline}</p>
          <p className="tagline text-3xl text-gold-text">“{BRAND.tagline}”</p>
          <p className="max-w-2xl text-lg leading-relaxed">{BRAND.mission.body}</p>
        </Section>

        <Section title="Rounded corners">
          <div className="flex flex-wrap gap-6">
            {Object.entries(BRAND.radius).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className={`h-20 w-28 border-2 border-primary bg-primary-light ${RADIUS_CLASSES[key as keyof typeof BRAND.radius]}`} />
                <p className="mt-2 text-sm">rounded-{key}</p>
                <p className="text-xs text-muted">{value}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Elevation · behaviour">
          <div className="flex flex-wrap gap-6">
            {Object.keys(BRAND.shadow).map((key) => (
              <div key={key} className={`flex h-20 w-40 items-center justify-center rounded-xl bg-canvas text-sm ${SHADOW_CLASSES[key as keyof typeof BRAND.shadow]}`}>
                shadow-{key}
              </div>
            ))}
            <div className="lift flex h-20 w-40 cursor-pointer items-center justify-center rounded-xl border border-line text-sm">
              hover: lift
            </div>
            <button type="button" className="interactive press h-11 rounded-md bg-primary px-5 text-sm text-on-primary hover:bg-primary-dark">
              press me
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default FoundationPage;
