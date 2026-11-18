interface Tab {
  label: string;
  count?: number;
}

interface TabBarProps {
  tabs: Tab[];
  active: string;
  onChange: (label: string) => void;
  className?: string;
}

function TabBar({ tabs, active, onChange, className = "" }: TabBarProps) {
  return (
    // On narrow screens the pill can be wider than the viewport, so the row
    // scrolls horizontally (bleeding to the screen edges) instead of clipping
    // the last tab. Scrollbar hidden; resets to a normal inline pill at sm+.
    <div
      className={`-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      <div className="inline-flex items-center gap-0.5 rounded-full border border-brand-green/15 bg-white p-1">
        {tabs.map((tab) => {
          const isActive = tab.label === active;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => onChange(tab.label)}
              className={[
                "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150 select-none sm:px-4",
                isActive
                  ? "bg-brand-green-dark text-white shadow-sm"
                  : "text-brand-green/60 hover:text-brand-green-dark",
              ].join(" ")}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-brand-green/40"}`}
                >
                  ({tab.count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TabBar;
