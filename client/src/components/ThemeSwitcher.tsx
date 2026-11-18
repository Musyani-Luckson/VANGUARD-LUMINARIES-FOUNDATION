import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemeMode } from "../theme";
import { cx } from "../globals/utils";

// ─── ThemeSwitcher ────────────────────────────────────────────────────────────
// Light · Dark · System. "System" follows the device (the default), so most
// people never need this; it's for those who want something else.

const OPTIONS: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
  { mode: "light", label: "Light", icon: Sun },
  { mode: "dark", label: "Dark", icon: Moon },
  { mode: "system", label: "System", icon: Monitor },
];

interface ThemeSwitcherProps {
  /** Fill the container, options sharing the width (account menu, drawer). */
  stretch?: boolean;
  className?: string;
}

function ThemeSwitcher({ stretch = false, className }: ThemeSwitcherProps) {
  const { mode, setMode } = useTheme();

  return (
    <div role="radiogroup" aria-label="Appearance" className={cx("rounded-lg border border-line bg-sunken p-0.5", stretch ? "flex" : "inline-flex", className)}>
      {OPTIONS.map(({ mode: m, label, icon: Icon }) => {
        const selected = mode === m;
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setMode(m)}
            className={cx(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              stretch && "flex-1 justify-center",
              selected ? "bg-canvas text-ink shadow-sm" : "text-muted hover:text-ink",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default ThemeSwitcher;
