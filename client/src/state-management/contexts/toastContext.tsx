import { useReducer, type Dispatch, type ReactNode } from "react";
import { toastReducer, toastInitialState } from "../reducers/toastReducer";
import type { ToastState, ToastAction } from "../reducers/toastReducer";
import { ToastContext } from "../hooks/toastHook";

// ─── Toast slice: provider ────────────────────────────────────────────────────
// Registered in AppProviders.tsx. The shell renders the toasts
// (components/ToastViewport.tsx); anything else calls useToast().showToast.

export interface ToastContextValue {
  state: ToastState;
  dispatch: Dispatch<ToastAction>;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, toastInitialState);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
}
