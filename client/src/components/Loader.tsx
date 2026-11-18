import { Loader2 } from "lucide-react";

interface LoaderProps {
  /** State-based message, e.g. "Loading items…". */
  message?: string;
  /** Accurate, real progress — renders a bar + "current of total · N%". Pass
   *  ONLY when you have genuine counts (completed steps / items); never fake it. */
  progress?: { current: number; total: number };
  /** "page" (fills the content area, the universal per-page loader),
   *  "block" (centred within its container) or "inline" (a row within content). */
  variant?: "page" | "block" | "inline";
  className?: string;
}

// ─── Loader ───────────────────────────────────────────────────────────────────
// The app's loading indicator. A spinner + optional message, and —
// when the caller has real quantities — an accurate progress bar with numbers.

function Loader({ message, progress, variant = "block", className = "" }: LoaderProps) {
  const pct =
    progress && progress.total > 0
      ? Math.min(100, Math.max(0, Math.round((progress.current / progress.total) * 100)))
      : null;

  if (variant === "inline") {
    return (
      <span
        role="status"
        aria-live="polite"
        className={`inline-flex items-center gap-2 text-sm text-muted ${className}`}
      >
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        {message ?? "Loading…"}
        {progress && (
          <span className="tabular-nums text-muted">
            {progress.current}/{progress.total}
          </span>
        )}
      </span>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 text-center ${
        variant === "page" ? "min-h-[60vh] w-full flex-1 py-16" : "py-16"
      } ${className}`}
    >
      <Loader2 className="h-7 w-7 animate-spin text-primary" />
      {message && <p className="text-sm font-medium text-ink">{message}</p>}
      {pct !== null && progress && (
        <div className="w-full max-w-xs">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-sunken">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs tabular-nums text-muted">
            {progress.current} of {progress.total} · {pct}%
          </p>
        </div>
      )}
    </div>
  );
}

export default Loader;
