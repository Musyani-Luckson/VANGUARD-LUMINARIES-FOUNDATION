import React from "react";
import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import { cx } from "../globals/utils";

// ─── Card ─────────────────────────────────────────────────────────────────────
// A bordered surface. Clickable when given `to` (router link) or `onClick`
// (button); `selected` draws the heavy ink border used for the current choice.
//   <Card to="/c/sensors">
//     <Card.Media src={img.url} alt={img.alt} />
//     <Card.Body>…</Card.Body>
//   </Card>

interface CardProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  "aria-label"?: string;
}

function Card({ children, to, onClick, selected = false, className, "aria-label": ariaLabel }: CardProps) {
  const interactive = Boolean(to || onClick);
  const classes = cx(
    "group block overflow-hidden rounded-lg bg-canvas text-left",
    selected ? "border-2 border-ink" : "border border-line",
    interactive &&
      "transition-shadow duration-150 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info",
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} aria-current={selected || undefined}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cx(classes, "w-full")} aria-label={ariaLabel} aria-pressed={selected}>
        {children}
      </button>
    );
  }
  return <div className={classes}>{children}</div>;
}

// ─── Media ───────────────────────────────────────────────────────────────────
// Image area with a fixed ratio. Without a src it shows the grey placeholder
// seen in the wireframes, so layouts never jump while images are missing.

const RATIOS = {
  square: "aspect-square",
  wide: "aspect-[4/3]",
  banner: "aspect-[16/9]",
} as const;

interface MediaProps {
  src?: string;
  alt?: string;
  ratio?: keyof typeof RATIOS;
  className?: string;
}

function Media({ src, alt = "", ratio = "wide", className }: MediaProps) {
  return (
    <div className={cx("relative overflow-hidden bg-sunken", RATIOS[ratio], className)}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <ImageOff className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-line" aria-hidden />
      )}
    </div>
  );
}

// ─── Body ────────────────────────────────────────────────────────────────────

function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("p-3", className)}>{children}</div>;
}

Card.Media = Media;
Card.Body = Body;

export default Card;
