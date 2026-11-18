import { Link } from "react-router-dom";
import { BRAND } from "../globals/brand";
import { ROUTES } from "../globals/constants";
import { cx } from "../globals/utils";

// ─── BrandLogo ────────────────────────────────────────────────────────────────
// The V mark (inline SVG from BRAND.logo, so it takes theme colours) and the
// three-line lockup. The text takes the surrounding colour: text-ink on the
// canvas, text-on-band on forest bands.

/** The mark alone. Defaults to the `mark` token (emerald on light, gold on
 *  dark); pass color="var(--brand-band-accent)" on forest bands, or
 *  color="currentColor" for a one-colour mark. */
export function BrandMark({
  className,
  color = "var(--brand-mark)",
  title = BRAND.logo.alt,
}: {
  className?: string;
  color?: string;
  /** Empty string = decorative (hidden from screen readers). */
  title?: string;
}) {
  return (
    <svg
      viewBox={BRAND.logo.markViewBox}
      className={cx("h-8 w-auto shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title || undefined}
    >
      <polygon points={BRAND.logo.markPoints} fill={color} />
    </svg>
  );
}

interface BrandLogoProps {
  className?: string;
  /** md for headers, lg for a standalone logo. */
  size?: "md" | "lg";
  /** On a forest band: gold mark, as in the master lockup. */
  onBand?: boolean;
  /** Link to the home page. */
  linked?: boolean;
}

function BrandLogo({ className, size = "md", onBand = false, linked = false }: BrandLogoProps) {
  const large = size === "lg";
  const logo = (
    <span className={cx("inline-flex items-center", large ? "gap-5" : "gap-3", className)}>
      <BrandMark
        title=""
        className={large ? "h-20 sm:h-24" : "h-10"}
        color={onBand ? "var(--brand-band-accent)" : undefined}
      />
      <span
        aria-hidden
        className={cx("font-sans leading-[1.05] font-medium tracking-tight", large ? "text-2xl sm:text-3xl" : "text-[0.95rem]")}
      >
        Vanguard
        <br />
        Luminaries
        <br />
        Foundation
      </span>
      <span className="sr-only">{BRAND.name}</span>
    </span>
  );
  return linked ? (
    <Link to={ROUTES.HOME} className="rounded-md">
      {logo}
    </Link>
  ) : (
    logo
  );
}

export default BrandLogo;
