import type { Transaction } from "@/data/transactions";
import { signMoney } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ChevronRight } from "lucide-react";
import { LogoBadge } from "./LogoBadge";

export function TransactionRow({ tx }: { tx: Transaction }) {
  const isOut = tx.amount < 0;
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-bg transition text-left"
      aria-label={`Transaction ${tx.merchant} ${signMoney(tx.amount)}`}
    >
      <LogoBadge logo={tx.logo} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{tx.merchant}</p>
        <p className="text-xs text-muted">{tx.subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className={cn("text-sm font-semibold", isOut ? "text-red-500" : "text-emerald-600")}>
          {signMoney(tx.amount)}
        </p>
        <ChevronRight className="h-4 w-4 text-muted" />
      </div>
    </button>
  );
}
