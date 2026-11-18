import React, { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { cx } from "../globals/utils";

// ─── Modal / Dialog ───────────────────────────────────────────────────────────
// Built on the native <dialog>: focus is trapped, Esc closes it and the page
// behind is inert. Controlled — the parent owns `open` and clears it in onClose.
// dialog — centred box at every size (confirmations)
// sheet  — slides up from the bottom on phones, centred box from tablet up
//          (the checkout sign-in gate)

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Shown before the title, e.g. a lock icon on the sign-in gate. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  /** Pinned under the content, usually the actions. */
  footer?: React.ReactNode;
  variant?: "dialog" | "sheet";
  className?: string;
}

function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  variant = "dialog",
  className,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const sheet = variant === "sheet";

  return (
    <dialog
      ref={ref}
      // onClose means "the user dismissed it" (Esc, backdrop, ✕). Esc is
      // cancelled here and left to the parent, which clears `open`; the native
      // close event is not used, because it also fires when the parent closes
      // the dialog itself (e.g. after a successful sign-in).
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // A click that lands on the <dialog> itself is a click on the backdrop.
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      className={cx(
        "max-h-[90dvh] overflow-y-auto bg-canvas p-0 text-ink shadow-xl backdrop:bg-overlay",
        "animate-in fade-in-0 duration-200",
        sheet
          ? "mt-auto mb-0 w-full max-w-none rounded-t-2xl slide-in-from-bottom-8 md:m-auto md:max-w-md md:rounded-2xl md:slide-in-from-bottom-0 md:zoom-in-95"
          : // A dialog that sets its own max-w-* (e.g. max-w-2xl) gets that cap instead of the default.
            cx("m-auto w-[calc(100%-2rem)] rounded-2xl zoom-in-95", !/(^|\s)max-w-/.test(className ?? "") && "md:max-w-md"),
        className,
      )}
    >
      <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {sheet && <div className="mx-auto -mt-2 mb-4 h-1 w-10 rounded-full bg-line md:hidden" aria-hidden />}

        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="flex items-center gap-2 text-base font-semibold [&>svg]:h-4 [&>svg]:w-4">
              {icon}
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-1 text-sm text-muted">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-1 rounded-md p-1 text-muted transition-colors hover:bg-sunken hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {children && <div className="mt-4">{children}</div>}
        {footer && <div className="mt-5">{footer}</div>}
      </div>
    </dialog>
  );
}

export default Modal;
