import { cx } from "../globals/utils";

// ─── Avatar ───────────────────────────────────────────────────────────────────
// Photo when `src` is given, otherwise initials on ink.
// circle — people (profile, chat)  ·  rounded — the app mark in the nav rail.

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "rounded";
  className?: string;
}

const SIZES = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Avatar({ name, src, size = "md", shape = "circle", className }: AvatarProps) {
  const classes = cx(
    "inline-flex shrink-0 items-center justify-center overflow-hidden font-semibold",
    shape === "circle" ? "rounded-full" : "rounded-xl",
    SIZES[size],
    className,
  );

  if (src) {
    return <img src={src} alt={name} className={cx(classes, "object-cover")} />;
  }
  return (
    <span role="img" aria-label={name} className={cx(classes, "bg-primary text-on-primary")}>
      {initials(name)}
    </span>
  );
}

export default Avatar;
