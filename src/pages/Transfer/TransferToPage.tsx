import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CONTACTS = [
  { id: "1", name: "Ali Ahmed", phone: "+1-300-555-0161", avatar: "/assets/avatars/ahmed.svg" },
  { id: "2", name: "Steve Gates", phone: "+1-300-555-0119", avatar: "/assets/avatars/steve.svg" },
  { id: "3", name: "Elon Jobs", phone: "+1-202-555-0171", avatar: "/assets/avatars/elon.svg" },
  { id: "4", name: "Ali Ahmed", phone: "+1-300-555-0161", avatar: "/assets/avatars/ali.svg" },
  { id: "5", name: "Steve Gates", phone: "+1-300-555-0119", avatar: "/assets/avatars/steve.svg" }
];

export default function TransferToPage() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");

  const frequent = CONTACTS.slice(0, 3);
  const all = CONTACTS.slice(3);

  const filtered = CONTACTS.filter((c) => (c.name + " " + c.phone).toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="min-h-screen bg-white px-5 pt-6 pb-24">
      <button type="button" onClick={() => nav(-1)} className="text-blue-600 mb-16">
        <span className="text-lg">‹</span> Back
      </button>

      <h1 className="text-2xl font-semibold mb-12">Transfer to</h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-purple-100 grid place-items-center">
          <img src="/assets/payicons/add.svg" alt="new" className="h-4 w-4" />
        </div>
        <div className="text-sm font-medium">New contact</div>
      </div>

      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-line" />
        <div className="text-sm text-muted">or</div>
        <div className="flex-1 h-px bg-line" />
      </div>

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

      <div className="text-sm text-ink font-normal mb-3">Frequent contacts</div>

      <div className="bg-white rounded-lg overflow-hidden mb-6">
        {frequent.map((c, i) => (
          <div key={c.id}>
            <button type="button" onClick={() => nav(`/transfer/amount/${c.id}`)} className="w-full flex items-center gap-3 px-3 py-4 text-left">
              <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-muted">{c.phone}</div>
              </div>
              <img src="/assets/icons/chevron-right.svg" alt="" className="h-4 w-4 opacity-60" />
            </button>
            {i !== frequent.length - 1 ? <div className="border-t border-line mx-3" /> : null}
          </div>
        ))}
      </div>

      <div className="text-sm text-ink font-normal mb-3">All contacts</div>

      <div className="bg-white rounded-lg overflow-hidden">
        {all.map((c, i) => (
          <div key={c.id}>
            <button type="button" onClick={() => nav(`/transfer/amount/${c.id}`)} className="w-full flex items-center gap-3 px-3 py-4 text-left">
              <img src={c.avatar} alt={c.name} className="h-10 w-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-muted">{c.phone}</div>
              </div>
              <img src="/assets/icons/chevron-right.svg" alt="" className="h-4 w-4 opacity-60" />
            </button>
            {i !== all.length - 1 ? <div className="border-t border-line mx-3" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
