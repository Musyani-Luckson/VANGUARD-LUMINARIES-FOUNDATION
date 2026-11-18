import React from "react";
import { cx } from "../globals/utils";

// ─── Badge / Tag ──────────────────────────────────────────────────────────────
// tag    — small uppercase label on a tinted background ("PRODUCT", "CONCEPT")
// status — coloured text only, for inline states ("In stock")
// Tones map to meaning, not colour: info = product, success = concept/in stock.

type Tone = "neutral" | "info" | "success" | "warning" | "danger";

interface BadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  appearance?: "tag" | "status";
  icon?: React.ReactNode;
  className?: string;
}

const TAG: Record<Tone, string> = {
  neutral: "bg-sunken text-muted",
  info: "bg-info-light text-info",
  success: "bg-accent-light text-accent-dark",
  warning: "bg-warning-light text-warning",
  danger: "bg-danger-light text-danger",
};

const STATUS: Record<Tone, string> = {
  neutral: "text-muted",
  info: "text-info",
  success: "text-accent-dark",
  warning: "text-warning",
  danger: "text-danger",
};

function Badge({ children, tone = "neutral", appearance = "tag", icon, className }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 whitespace-nowrap [&>svg]:h-3 [&>svg]:w-3",
        appearance === "tag"
          ? cx("rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide", TAG[tone])
          : cx("text-xs font-medium", STATUS[tone]),
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export default Badge;
