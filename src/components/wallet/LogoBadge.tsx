import { useState } from "react";
import type { Transaction } from "@/data/transactions";
import { cn } from "@/lib/cn";

export function LogoBadge({ logo }: { logo: Transaction["logo"] }) {
  // Minimal vector-ish badges to match the design feel without external images.
  const map: Record<string, { bg: string; text: string; label: string }> = {
    walmart: { bg: "bg-blue-100", text: "text-blue-700", label: "W" },
    netflix: { bg: "bg-red-100", text: "text-red-700", label: "N" },
    amazon: { bg: "bg-orange-100", text: "text-orange-700", label: "a" },
    nike: { bg: "bg-zinc-100", text: "text-zinc-700", label: "N" },
    topup: { bg: "bg-violet-100", text: "text-violet-700", label: "+" },
    home_depot: { bg: "bg-amber-100", text: "text-amber-700", label: "HD" },
    adidas: { bg: "bg-slate-100", text: "text-slate-800", label: "a" },
    reebok: { bg: "bg-neutral-100", text: "text-neutral-800", label: "R" },
    apple: { bg: "bg-slate-100", text: "text-slate-800", label: "" },
  };

  const it = map[logo] ?? map.walmart;

  // try loading the svg logo from public assets; if it fails, fall back to the map badge
  const imgSrc = `/assets/logos/${logo}.svg`;
  const [showImg, setShowImg] = useState(true);

  return (
    <div className="h-10 w-10">
      {showImg ? (
        <img
          src={imgSrc}
          alt={logo}
          role="img"
          className="h-10 w-10 rounded-xl object-cover"
          onError={() => setShowImg(false)}
        />
      ) : (
        <div
          className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center font-semibold",
            it.bg,
            it.text,
          )}
        >
          <span className="text-sm leading-none">{it.label}</span>
        </div>
      )}
    </div>
  );
}
