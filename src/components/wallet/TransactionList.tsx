import type { Transaction } from "@/data/transactions";
import { TransactionRow } from "./TransactionRow";

export function TransactionList({ items }: { items: Transaction[] }) {
  return (
    <div className="divide-y-2 divide-line rounded-2xl border-line bg-white">
      {items.map((tx) => (
        <div key={tx.id} className="px-1">
          <TransactionRow tx={tx} />
        </div>
      ))}
    </div>
  );
}
