import Toast from "./Toast";
import { useToast } from "../state-management/hooks/toastHook";

// ─── ToastViewport ────────────────────────────────────────────────────────────
// The shell's toast area, placed per the wireframes:
//   phone   — full width (16 margin), just above the bottom tab bar
//   tablet  — bottom-right, 24 from the edges
//   desktop — top-right under the header, aligned to the 1440 content edge

function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      className={[
        "pointer-events-none fixed z-40 flex flex-col gap-2",
        "inset-x-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))]",
        "md:inset-x-auto md:bottom-6 md:right-6 md:w-88",
        "lg:bottom-auto lg:top-20 lg:right-[max(var(--page-margin),calc((100vw-var(--page-max))/2+var(--page-margin)))]",
      ].join(" ")}
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast
            title={t.title}
            message={t.message}
            tone={t.tone}
            action={t.action}
            onDismiss={() => dismissToast(t.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default ToastViewport;
