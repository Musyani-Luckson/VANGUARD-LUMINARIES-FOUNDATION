import { BRAND } from "./brand";
import { LOCALE } from "./constants";

// ── Browser storage ───────────────────────────────────────────────────────────
// JSON in local/session storage under BRAND.storagePrefix. Storage can be
// missing or throw (private mode, quota, blocked cookies), so every call is
// guarded and reads fall back.

type StorageKind = "local" | "session";

function store(kind: StorageKind): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function readStored<T>(kind: StorageKind, name: string, fallback: T): T {
  try {
    const raw = store(kind)?.getItem(`${BRAND.storagePrefix}:${name}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored(kind: StorageKind, name: string, value: unknown): void {
  try {
    store(kind)?.setItem(`${BRAND.storagePrefix}:${name}`, JSON.stringify(value));
  } catch {
    // Not persisted; state still works for this visit.
  }
}

export function removeStored(kind: StorageKind, name: string): void {
  try {
    store(kind)?.removeItem(`${BRAND.storagePrefix}:${name}`);
  } catch {
    // Nothing to remove.
  }
}

/** Joins class names, skipping falsy parts: cx("a", cond && "b"). */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** "18 Nov 2026" in the brand locale. */
export function fmtDate(value: string | number | Date): string {
  return new Date(value).toLocaleDateString(LOCALE, { day: "numeric", month: "short", year: "numeric" });
}
