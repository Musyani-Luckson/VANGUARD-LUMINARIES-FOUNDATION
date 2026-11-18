import React from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { cx } from "../globals/utils";

// ─── Button ───────────────────────────────────────────────────────────────────
// primary   — the one main action on a view ("Buy now", "Check out")
// secondary — outlined alternative next to a primary ("Add to cart")
// ghost     — low-emphasis actions in dense UI ("Remove", "Later")
// danger    — destructive actions
// Pass `to` to render a router link styled as a button.

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Renders a <Link> instead of a <button>. Ignored while disabled/loading. */
  to?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  form?: string;
  disabled?: boolean;
  /** Shows a spinner and blocks clicks. */
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretches to the container width (mobile CTAs). */
  fullWidth?: boolean;
  /** Icon before the label. */
  icon?: React.ReactNode;
  "aria-label"?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-dark",
  secondary: "border border-primary bg-canvas text-primary hover:bg-primary-light",
  ghost: "bg-transparent text-ink hover:bg-primary-light",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-sm gap-2",
};

export default function Button({
  children,
  onClick,
  to,
  className,
  type = "button",
  form,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const inactive = disabled || loading;
  const classes = cx(
    "inline-flex shrink-0 items-center justify-center rounded-md font-medium whitespace-nowrap select-none",
    "transition-colors duration-150 active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    inactive && "pointer-events-none opacity-50",
    className,
  );
  const content = (
    <>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : icon}
      {children}
    </>
  );

  if (to && !inactive) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={inactive}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </button>
  );
}
