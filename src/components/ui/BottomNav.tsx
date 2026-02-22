import { cn } from "@/lib/cn";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Tab = "home" | "history" | "cards" | "more";

export function BottomNav({ active, onChange }: { active?: Tab; onChange?: (t: Tab) => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  const pathToTab = (p: string): Tab => {
    if (p.startsWith("/history")) return "history";
    if (p.startsWith("/cards")) return "cards";
    if (p.startsWith("/more")) return "more";
    return "home";
  };

  const tabToPath = (t: Tab) => {
    return { home: "/home", history: "/history", cards: "/cards", more: "/more" }[t];
  };

  const current = active ?? pathToTab(location.pathname);

  const Item = ({ tab, label, iconName }: { tab: Tab; label: string; iconName: string }) => {
    const is = current === tab;
    const [showImg, setShowImg] = useState(true);

  // icon files are expected under /assets/icons/{iconName}-active.svg and -inactive.svg
  const activeSrc = `/assets/bottomicons/${iconName}_dark.svg`;
    const inactiveSrc = `/assets/bottomicons/${iconName}_light.svg`;

    return (
      <button
        type="button"
        onClick={() => {
          const path = tabToPath(tab);
          try {
            if (onChange) onChange(tab);
          } catch (e) {
            // preserve navigation even if onChange throws
            // log the error for debugging
            // eslint-disable-next-line no-console
            console.error("BottomNav onChange error:", e);
          }
          if (path) {
            // eslint-disable-next-line no-console
            console.debug("BottomNav navigate to", path);
            try {
              navigate(path);
            } catch (e) {
              // fallback to full page navigation if SPA navigation fails
              // eslint-disable-next-line no-console
              console.error("BottomNav navigate failed, falling back to location:", e);
              window.location.href = path;
            }
          } else {
            // eslint-disable-next-line no-console
            console.warn("BottomNav: no path for tab", tab);
          }
        }}
        className={cn(
          "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition",
          is ? "text-brand-500" : "text-muted hover:text-ink"
        )}
        aria-current={is ? "page" : undefined}
      >
        {showImg ? (
          <img
            src={is ? activeSrc : inactiveSrc}
            alt={label}
            className="h-5 w-5"
            role="img"
            onError={() => setShowImg(false)}
          />
        ) : (
          <div className="h-5 w-5 grid place-items-center text-sm">{label.charAt(0)}</div>
        )}

        {label}
        {/* active indicator: thicker, wider overline positioned at the nav's top border */}
        {is ? (
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-0.5 rounded-full bg-brand-500"
            aria-hidden="true"
          />
        ) : null}
      </button>
    );
  };

  return (
    <nav className="relative border-t border-line dark:border-white/10 bg-white dark:bg-[#0B0F1A]">
      <div className="grid grid-cols-4">
        <Item tab="home" label="Home" iconName="home" />
        <Item tab="history" label="History" iconName="history" />
        <Item tab="cards" label="Cards" iconName="cards" />
        <Item tab="more" label="More" iconName="more" />
      </div>
    </nav>
  );
}
