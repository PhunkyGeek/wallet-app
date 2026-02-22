import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BillDetailsSheet from "@/components/bills/BillDetailsSheet";

const SAVED = [
  { key: "electricity", label: "Electricity", subtitle: "Due: $132.32", icon: "/assets/payicons/zap.svg", bg: "bg-purple-100", amount: "$132.32", dueDate: "December 29, 2022 - 12:32", reg: "23010412432431" },
  { key: "water", label: "Water", subtitle: "Due: $32.21", icon: "/assets/payicons/water.svg", bg: "bg-blue-100", amount: "$32.21", dueDate: "December 20, 2022 - 09:12", reg: "23010412432432" },
  { key: "phone", label: "Phone", subtitle: "All paid", icon: "/assets/payicons/connection.svg", bg: "bg-green-100", amount: "$0.00", dueDate: "", reg: "" }
];

export default function PayToPage() {
  const nav = useNavigate();
   const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="min-h-screen bg-white px-5 pt-6 pb-24">
      <button type="button" onClick={() => nav(-1)} className="text-blue-600 mb-4">
        <span className="text-lg">‹</span> Back
      </button>

      <h1 className="text-2xl font-semibold mt-8 mb-16">Pay to</h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-purple-100 grid place-items-center">
          <img src="/assets/payicons/add.svg" alt="new" className="h-4 w-4" />
        </div>
        <div className="text-sm font-medium">New biller</div>
      </div>

      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-line" />
        <div className="text-sm text-muted">or</div>
        <div className="flex-1 h-px bg-line" />
      </div>

      <div>
        <div className="mt-4 mb-8 flex gap-3">
            <label className="relative flex-1 block">
            <span className="sr-only">Search</span>
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <img src="/assets/icons/search.svg" alt="Search" className="h-4 w-4" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search contact"
                className="w-full rounded-md border border-line bg-white py-3 pl-10 pr-3 text-sm placeholder:text-muted focus:border-[#5B35D5] focus:ring-2 focus:ring-[#5B35D5]/20"
            />
          </label>

        </div>

        <div className="text-sm text-ink font-semibold mb-3">Saved billers</div>

        <div className="bg-white rounded-lg overflow-hidden">
          {SAVED.map((s, i) => (
            <div key={s.key}>
              <button
                type="button"
                onClick={() => setSelected(s)}
                className="w-full flex items-center gap-3 px-3 py-4 text-left"
              >
                <div className={`h-10 w-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <img src={s.icon} alt={s.label} className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{s.label}</div>
                  <div className="text-sm text-muted">{s.subtitle}</div>
                </div>

                <img src="/assets/icons/chevron-right.svg" alt="" className="h-4 w-4 opacity-60" />
              </button>

              {i !== SAVED.length - 1 ? <div className="border-t border-line mx-3" /> : null}
            </div>
          ))}
        </div>
      </div>

      <BillDetailsSheet
        open={!!selected}
        bill={selected}
        onClose={() => setSelected(null)}
        onSecure={() => {
          setSelected(null);
          nav("/bills/success");
        }}
      />
    </div>
  );
}
