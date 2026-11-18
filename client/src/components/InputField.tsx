import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cx } from "../globals/utils";

// ─── InputField ───────────────────────────────────────────────────────────────
// outline — form fields (sign-in, address)
// filled  — search bars in the header
// Pair with Form.Field for a label, hint and error message.

interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  name: string;
  icon?: React.ReactNode;
  error?: string;
  variant?: "outline" | "filled";
  ref?: React.Ref<HTMLInputElement>;
}

function InputField({
  id,
  name,
  type = "text",
  icon,
  error,
  variant = "outline",
  disabled = false,
  className,
  ...rest
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputId = id ?? name;

  return (
    <div className={cx("relative w-full", className)}>
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
      )}

      <input
        {...rest}
        id={inputId}
        name={name}
        type={isPassword && showPassword ? "text" : type}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : rest["aria-describedby"]}
        className={cx(
          "h-10 w-full rounded-md border text-sm text-ink placeholder:text-muted",
          "transition-colors duration-150 focus:outline-none focus:ring-2",
          icon ? "pl-9" : "pl-3",
          isPassword ? "pr-10" : "pr-3",
          variant === "filled"
            ? "border-line bg-sunken focus:bg-canvas"
            : "border-line bg-canvas",
          error
            ? "border-danger focus:border-danger focus:ring-danger/20"
            : "focus:border-ink focus:ring-ink/10",
          disabled && "cursor-not-allowed bg-sunken text-muted",
        )}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}

export default InputField;
