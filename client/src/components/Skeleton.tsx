import { cx } from "../globals/utils";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
// Grey placeholder shown while content loads. Size it with className.
//   <Skeleton className="h-4 w-2/3" />
//   <Skeleton.Text lines={2} />

interface SkeletonProps {
  className?: string;
  /** "md" for blocks (images, cards), "full" for text lines and avatars. */
  rounded?: "md" | "full";
}

function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cx(
        "animate-pulse bg-sunken",
        rounded === "full" ? "rounded-full" : "rounded-lg",
        className,
      )}
    />
  );
}

/** Stacked text lines; the last one is shorter, like a real paragraph. */
function Text({ lines = 2, className }: { lines?: number; className?: string }) {
  return (
    <div className={cx("space-y-2", className)} aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          rounded="full"
          className={cx("h-3", i === lines - 1 && lines > 1 ? "w-1/2" : "w-full")}
        />
      ))}
    </div>
  );
}

Skeleton.Text = Text;

export default Skeleton;
