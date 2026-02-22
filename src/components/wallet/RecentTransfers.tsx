import { Plus } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useNavigate } from "react-router-dom";

const people = [
  { name: "Ali", image: "ali.svg" },
  { name: "Steve", image: "steve.svg" },
  { name: "Ahmed", image: "ahmed.svg" },
  { name: "Maya", image: "maya.svg" },
  { name: "Zoe", image: "zoe.svg" }
];

export function RecentTransfers() {
  const nav = useNavigate();

  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-ink">Recent Transfers</h3>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => nav('/transfer/to')}
          className="flex shrink-0 flex-col items-center gap-1"
          aria-label="Add transfer"
        >
          <div className="h-12 w-12 rounded-full bg-violet-200 grid place-items-center border-violet-600">
            <Plus className="h-5 w-5 text-ink" />
          </div>
          <span className="text-[11px] text-muted">Add</span>
        </button>

        {people.map((p) => (
          <button key={p.name} type="button" className="flex shrink-0 flex-col items-center gap-1" aria-label={p.name}>
            <div className="h-12 w-12">
              <Avatar name={p.name} src={`/assets/avatars/${p.image}`} size={48} />
            </div>
            <span className="text-[11px] text-muted">{p.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
