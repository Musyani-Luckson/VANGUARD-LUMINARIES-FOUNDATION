import { AlertCircle, Check, Info, X } from "lucide-react";
import { cx } from "../globals/utils";

// ─── Toast ────────────────────────────────────────────────────────────────────
// One short confirmation: "Added to cart · USB-C Cable, 1 m". Presentational
// only — where toasts sit and how long they stay is the app shell's job.

type Tone = "success" | "info" | "error";

interface ToastProps {
  /** Coloured lead-in, e.g. "Added to cart". */
  title: string;
  /** What it refers to, e.g. the product and variant. */
  message?: string;
  tone?: Tone;
  /** One optional follow-up, e.g. { label: "View cart", onClick }. */
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  className?: string;
}

const TONES: Record<Tone, { icon: typeof Check; color: string }> = {
  success: { icon: Check, color: "text-toast-success" },
  info: { icon: Info, color: "text-toast-info" },
  error: { icon: AlertCircle, color: "text-toast-error" },
};

function Toast({ title, message, tone = "success", action, onDismiss, className }: ToastProps) {
  const { icon: Icon, color } = TONES[tone];

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cx(
        "flex w-full items-center gap-3 rounded-xl bg-primary px-4 py-3 text-sm text-on-primary shadow-lg",
        "animate-in fade-in-0 slide-in-from-bottom-2 duration-200",
        className,
      )}
    >
      <Icon className={cx("h-4 w-4 shrink-0", color)} aria-hidden />
      <p className="min-w-0 flex-1 break-words">
        <span className={cx("font-semibold", color)}>{title}</span>
        {message && <span> · {message}</span>}
      </p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="shrink-0 rounded px-1.5 py-0.5 text-sm font-semibold underline-offset-2 hover:underline"
        >
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="-mr-1 shrink-0 rounded p-0.5 text-on-primary/60 transition-colors hover:text-on-primary"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default Toast;
