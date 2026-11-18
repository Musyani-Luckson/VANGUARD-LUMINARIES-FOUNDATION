interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  id?: string;
  /** Accessible name when the switch has no adjacent visible label. */
  ariaLabel?: string;
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
// The platform switch (primary-colour track + sliding knob). Extracted from the
// role="switch" pattern used across Notifications / Workspace so every on/off
// control looks and behaves the same.

function Toggle({ checked, onChange, disabled = false, id, ariaLabel }: ToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      disabled={disabled}
      className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors disabled:opacity-50 ${
        checked ? "bg-primary" : "bg-line"
      }`}
    >
      <span
        className="h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
        style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  );
}

export default Toggle;
