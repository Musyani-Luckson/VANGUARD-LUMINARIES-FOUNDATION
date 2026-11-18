// ─── Toast slice: reducer ─────────────────────────────────────────────────────
// Short confirmations shown in the app shell's toast area ("Added to cart").
// Oldest first; only the newest MAX_TOASTS are kept.

export type ToastTone = "success" | "info" | "error";

export interface ToastItem {
  id: number;
  title: string;
  message?: string;
  tone: ToastTone;
  action?: { label: string; onClick: () => void };
}

export interface ToastState {
  toasts: ToastItem[];
}

export const MAX_TOASTS = 3;

export const toastInitialState: ToastState = { toasts: [] };

export type ToastAction =
  | { type: "TOAST_ADD"; payload: ToastItem }
  | { type: "TOAST_DISMISS"; payload: number };

export function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case "TOAST_ADD":
      return { toasts: [...state.toasts, action.payload].slice(-MAX_TOASTS) };
    case "TOAST_DISMISS":
      return { toasts: state.toasts.filter((t) => t.id !== action.payload) };
    default:
      return state;
  }
}
