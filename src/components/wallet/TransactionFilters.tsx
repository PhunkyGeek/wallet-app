import { cn } from "@/lib/cn";

export type Filter = "all" | "sent" | "received";

export function TransactionFilters({
  value,
  onChange
}: {
  value: Filter;
  onChange: (v: Filter) => void;
}) {
  const Chip = ({ v, label }: { v: Filter; label: string }) => {
    const is = value === v;
    return (
      <button
        type="button"
        onClick={() => onChange(v)}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold transition",
          is ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex gap-2">
      <Chip v="all" label="All" />
      <Chip v="sent" label="Sent" />
      <Chip v="received" label="Received" />
    </div>
  );
}
