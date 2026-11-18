import type { ThemeName } from "./types.ts";

// ─── Theme module: contrast checks ────────────────────────────────────────────
// WCAG 2 contrast ratio, so a brand edit that makes text hard to read fails a
// test instead of reaching users. 4.5 = AA body text, 3 = large text / icons.

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`Contrast checks need hex colours, got "${hex}"`);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** 1 (identical) to 21 (black on white). */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export interface ContrastFailure {
  theme: ThemeName;
  text: string;
  background: string;
  ratio: number;
  min: number;
}

/** Checks [textToken, backgroundToken, min?] pairs in both themes. */
export function checkContrast<K extends string>(
  themes: Record<ThemeName, Record<K, string>>,
  pairs: [K, K, number?][],
): ContrastFailure[] {
  const failures: ContrastFailure[] = [];
  for (const theme of ["light", "dark"] as ThemeName[]) {
    for (const [text, background, min = 4.5] of pairs) {
      const ratio = contrastRatio(themes[theme][text], themes[theme][background]);
      if (ratio < min) failures.push({ theme, text, background, ratio: Math.round(ratio * 100) / 100, min });
    }
  }
  return failures;
}
