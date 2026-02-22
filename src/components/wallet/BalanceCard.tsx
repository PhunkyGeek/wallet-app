import { money } from "@/lib/format";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useNavigate } from "react-router-dom";

function useCountUp(target: number, ms = 650) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const from = val;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return val;
}

function Action({ iconSrc, label, onClick }: { iconSrc: string; label: string; onClick?: () => void }) {
  const [showImg, setShowImg] = useState(true);
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 px-3 text-center text-xs text-white/90 hover:text-white transition"
    >
      <div className="mx-auto grid place-items-center h-9 w-9 rounded-xl ">
        {showImg ? (
          <img
            src={iconSrc}
            alt={label}
            className="h-5 w-5"
            onError={() => setShowImg(false)}
          />
        ) : (
          <div className="h-4 w-4 grid place-items-center text-white/90 font-semibold">{label.charAt(0)}</div>
        )}
      </div>
      <div className="mt-2">{label}</div>
    </button>
  );
}

export function BalanceCard({ balance }: { balance: number }) {
  const nav = useNavigate();
  const animated = useCountUp(balance);

  const formatted = money(animated);
  const [intPart, decPart] = formatted.split(".");

  return (
    <section className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-600 text-white p-4 md:p-5 shadow-2xl text-center">
      <p className="text-[14px] text-white/70">Main balance</p>
      <div className="mt-1 flex flex-col items-center gap-0">
  <div className="flex items-start">
          <h2 className="text-5xl mb-6 font-bold tracking-tight">${intPart}</h2>
          {decPart ? (
            <span
              className="text-xs text-white/80"
              style={{ marginLeft: 2, transform: "translateY(24px)", fontSize: 24 }}
            >
              .{decPart}
            </span>
          ) : null}
        </div>
      </div>

      <div className={cn("mt-4 flex items-center justify-between border-white/15 pt-3 divide-x divide-white/15")}>
        <Action iconSrc="/assets/logos/topsup.svg" label="Top up" />
        <Action iconSrc="/assets/logos/withdrawal.svg" label="Withdraw" />
        <Action
          iconSrc="/assets/logos/transfer.svg"
          label="Transfer"
          onClick={() => nav('/transfer/to')}
        />
      </div>
    </section>
  );
}
