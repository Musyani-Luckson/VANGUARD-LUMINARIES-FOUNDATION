import type { ThemeMode } from "./types.ts";

// ─── Theme module: reducer ────────────────────────────────────────────────────
// The chosen mode and what the device prefers; the shown theme is derived.

export interface ThemeState {
  mode: ThemeMode;
  /** Device prefers dark (prefers-color-scheme). */
  systemDark: boolean;
}

export type ThemeAction =
  | { type: "THEME_SET_MODE"; mode: ThemeMode }
  | { type: "THEME_SYSTEM_CHANGED"; systemDark: boolean };

export function themeReducer(
  state: ThemeState,
  action: ThemeAction,
): ThemeState {
  switch (action.type) {
    case "THEME_SET_MODE":
      return state.mode === action.mode
        ? state
        : { ...state, mode: action.mode };
    case "THEME_SYSTEM_CHANGED":
      return state.systemDark === action.systemDark
        ? state
        : { ...state, systemDark: action.systemDark };
    default:
      return state;
  }
}
