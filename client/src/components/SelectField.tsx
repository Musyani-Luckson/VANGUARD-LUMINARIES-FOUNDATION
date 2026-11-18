import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <select
        id={id ?? name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        className={[
          // Same look as InputField, from the theme's colours (light and dark).
          "h-10 w-full appearance-none rounded-md border bg-canvas pl-3 pr-9 text-sm",
          "transition-colors duration-150 focus:outline-none focus:ring-2",
          value ? "text-ink" : "text-muted",
          error ? "border-danger focus:border-danger focus:ring-danger/20" : "border-line focus:border-ink focus:ring-ink/10",
          disabled ? "cursor-not-allowed bg-sunken text-muted" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
};

export default SelectField;
