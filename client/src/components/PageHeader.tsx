import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cx } from "../globals/utils";

// ─── PageHeader ───────────────────────────────────────────────────────────────
// Title row at the top of every page. With `backTo` it shows "‹ Title" — on
// phones this replaces the app header, so inner pages always have a way back.
//   <PageHeader title="Microcontrollers" backTo={ROUTES.HOME} eyebrow="Categories / Microcontrollers" />

interface PageHeaderProps {
  title: string;
  /** Where the back link goes. Explicit, so deep links never "go back" off-site. */
  backTo?: string;
  backLabel?: string;
  /** Small line above the title, e.g. a breadcrumb. */
  eyebrow?: React.ReactNode;
  /** "p" when the page's <h1> is elsewhere (product details). */
  titleAs?: "h1" | "p";
  /** Right-aligned controls. */
  actions?: React.ReactNode;
  className?: string;
}

function PageHeader({ title, backTo, backLabel = "Back", eyebrow, titleAs: Title = "h1", actions, className }: PageHeaderProps) {
  return (
    <div className={cx("mb-4 md:mb-6", className)}>
      {eyebrow && <div className="mb-1 text-xs text-muted">{eyebrow}</div>}
      <div className="flex items-center gap-2">
        {backTo && (
          <Link
            to={backTo}
            aria-label={backLabel}
            className="-ml-2 rounded-md p-1 text-ink transition-colors hover:bg-sunken"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        )}
        <Title className="min-w-0 flex-1 truncate text-lg font-semibold md:text-xl">{title}</Title>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
