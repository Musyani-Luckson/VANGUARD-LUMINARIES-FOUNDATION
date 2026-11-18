import { createContext, useCallback, useContext } from "react";
import type { ToastContextValue } from "../contexts/toastContext";
import type { ToastItem } from "../reducers/toastReducer";

// ─── Toast slice: hook ────────────────────────────────────────────────────────
//   const { showToast } = useToast();
//   showToast({ title: "Added to cart", message: "USB-C Cable, 1 m" });
// Toasts dismiss themselves; errors and toasts with an action (Undo, View
// cart) stay longer so there is time to read and use them.

export const ToastContext = createContext<ToastContextValue | null>(null);

const DURATION_MS = { success: 4000, info: 4000, error: 7000 } as const;
const WITH_ACTION_MS = 8000;

let nextId = 1;

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  const { state, dispatch } = ctx;

  const dismissToast = useCallback(
    (id: number) => dispatch({ type: "TOAST_DISMISS", payload: id }),
    [dispatch],
  );

  const showToast = useCallback(
    (toast: Omit<ToastItem, "id" | "tone"> & { tone?: ToastItem["tone"] }): number => {
      const id = nextId++;
      const tone = toast.tone ?? "success";
      dispatch({ type: "TOAST_ADD", payload: { ...toast, id, tone } });
      window.setTimeout(() => dismissToast(id), toast.action ? WITH_ACTION_MS : DURATION_MS[tone]);
      return id;
    },
    [dispatch, dismissToast],
  );

  return { toasts: state.toasts, showToast, dismissToast };
}
