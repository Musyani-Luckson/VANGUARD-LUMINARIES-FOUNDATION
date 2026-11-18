import React from "react";
import { cx } from "../globals/utils";

// ─── EmptyState ───────────────────────────────────────────────────────────────
// Shown when a list has nothing in it (empty cart, empty waitlist, no
// messages) or a lookup fails. One icon, one line, optional detail and action.

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  /** Usually a <Button>. */
  action?: React.ReactNode;
  className?: string;
}

function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cx("flex flex-col items-center px-6 py-12 text-center", className)}>
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sunken text-muted [&>svg]:h-6 [&>svg]:w-6">
          {icon}
        </div>
      )}
      <p className="text-base font-semibold text-ink">{title}</p>
      {description && <p className="mt-1 max-w-xs text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
