import React from "react";

// ─── Root ────────────────────────────────────────────────────────────────────

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  id?: string;
  /**
   * Block the browser's implicit "Enter in a field submits the form" behaviour,
   * so the form only saves when the user clicks the submit button. Enter still
   * works in textareas, and keyboard activation of buttons is unaffected.
   */
  preventEnterSubmit?: boolean;
}

function Form({ children, onSubmit, className = "", id, preventEnterSubmit = false }: FormProps) {
  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      onKeyDown={
        preventEnterSubmit
          ? (e) => {
              if (
                e.key === "Enter" &&
                (e.target as HTMLElement).tagName === "INPUT"
              ) {
                e.preventDefault();
              }
            }
          : undefined
      }
      className={className}
      noValidate
    >
      {children}
    </form>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

function Section({ title, description, children, className = "" }: SectionProps) {
  return (
    <fieldset className={`mb-6 last:mb-0 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <legend className="text-sm font-semibold text-ink">
              {title}
            </legend>
          )}
          {description && (
            <p className="mt-0.5 text-xs text-muted">{description}</p>
          )}
        </div>
      )}
      {children}
    </fieldset>
  );
}

// ─── Row ─────────────────────────────────────────────────────────────────────

interface RowProps {
  children: React.ReactNode;
  cols?: 2 | 3;
  /** Screen size at which the row switches from stacked to multi-column.
   *  "sm" (default, 640px) or "md" (768px) to keep fields stacked longer on
   *  phones. */
  stack?: "sm" | "md";
  className?: string;
}

// Literal class strings so Tailwind's scanner can see them (no dynamic concat).
const ROW_GRID: Record<string, string> = {
  "sm-2": "sm:grid-cols-2",
  "sm-3": "sm:grid-cols-3",
  "md-2": "md:grid-cols-2",
  "md-3": "md:grid-cols-3",
};

function Row({ children, cols = 2, stack = "sm", className = "" }: RowProps) {
  const grid = ROW_GRID[`${stack}-${cols}`];
  return (
    <div className={`grid grid-cols-1 gap-x-4 gap-y-0 ${grid} ${className}`}>
      {children}
    </div>
  );
}

// ─── Field ───────────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ label, htmlFor, error, required, hint, children, className = "" }: FieldProps) {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 text-xs font-medium text-ink"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden>
            *
          </span>
        )}
      </label>

      {children}

      {hint && !error && (
        <p className="mt-1 text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p id={htmlFor ? `${htmlFor}-error` : undefined} className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

function Divider({ className = "" }: { className?: string }) {
  return <hr className={`my-6 border-line ${className}`} />;
}

// ─── Compound export ─────────────────────────────────────────────────────────

Form.Section = Section;
Form.Row = Row;
Form.Field = Field;
Form.Divider = Divider;

export default Form;
