import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CONTACTS: Record<string, any> = {
  "1": { id: "1", name: "Ali Ahmed", phone: "+1-300-555-0161", avatar: "/assets/avatars/ahmed.svg" },
  "2": { id: "2", name: "Steve Gates", phone: "+1-300-555-0119", avatar: "/assets/avatars/steve.svg" },
  "3": { id: "3", name: "Elon Jobs", phone: "+1-202-555-0171", avatar: "/assets/avatars/elon.svg" }
};

function formatAmount(raw: string) {
  if (!raw) return "$00.00";
  // raw is digits and optional decimal
  const num = Number(raw);
  if (isNaN(num)) return "$0.00";
  return num.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

export default function TransferAmountPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const contact = CONTACTS[id as string] ?? { name: "Unknown", phone: "", avatar: "" };

  // derive avatar from contact name if explicit avatar missing
  const slug = (contact.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const avatarSrc = contact.avatar && contact.avatar.length ? contact.avatar : `/assets/avatars/${slug || "ahmed"}.svg`;

  const [raw, setRaw] = useState("");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const display = useMemo(() => formatAmount(raw), [raw]);

  useEffect(() => {
    // if no contact, go back
    if (!id) nav(-1);
  }, [id, nav]);

  // Global keyboard handling so physical keyboard keys work
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (/^[0-9]$/.test(k)) {
        e.preventDefault();
        setFocused(true);
        press(k);
        return;
      }
      if (k === "Backspace") {
        e.preventDefault();
        setFocused(true);
        press("bk");
        return;
      }
      if (k === ".") {
        e.preventDefault();
        setFocused(true);
        press(".");
        return;
      }
      if (k === "Enter") {
        e.preventDefault();
        handleDone();
        return;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  // click outside to blur
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const press = (key: string) => {
    if (key === "bk") {
      setRaw((r) => r.slice(0, -1));
      return;
    }
    if (key === ".") {
      if (raw.includes(".")) return;
      setRaw((r) => (r === "" ? "0." : r + "."));
      return;
    }
    // numeric
    if (/^[0-9]$/.test(key)) {
      setRaw((r) => (r + key).slice(0, 12));
    }
  };

  const handleDone = () => {
    // navigate to secure review step, pass raw amount in router state
    if (!id) return;
    nav(`/transfer/secure/${id}`, { state: { amount: raw } });
  };

  const caret = (
    <span
      className={`inline-block w-[2px] h-8 animate-pulse align-middle ml-1 ${focused ? "bg-brand-700" : "bg-ink"}`}
      style={{ display: "inline-block" }}
    />
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-white px-5 pt-6 pb-36 flex flex-col items-center overflow-x-hidden">
      <button type="button" onClick={() => nav(-1)} className="text-blue-600 self-start mb-16">
        <span className="text-lg">‹</span> Back
      </button>

      <h1 className="text-2xl font-semibold mb-8">Transfer to</h1>

      <div className="flex items-center gap-3 mb-10">
        <img src={avatarSrc} alt={contact.name} className="h-16 w-16 rounded-full object-cover" />
        <div>
          <div className="font-semibold">{contact.name}</div>
          <div className="text-sm text-muted">{contact.phone}</div>
        </div>
      </div>

      <div className="text-sm text-muted mb-2">Enter Amount</div>

      <button
        type="button"
        onClick={() => setFocused(true)}
        className="mb-2 bg-transparent border-0 p-0"
        aria-label="Enter amount"
      >
        <div className={`text-4xl font-semibold mb-2 ${raw ? "text-black" : "text-gray-400"}`}>
          {raw ? display : "$00.00"}
          {!raw ? caret : null}
        </div>
      </button>

      <div className={`w-full h-0.5 max-w-[220px] mb-24 transition-colors ${focused ? "bg-brand-600" : "bg-gray-300"}`} />

  {/* Keypad - top-only shadow (implemented with a fading gradient) */}
  <div className="mt-auto w-full max-w-[360px] relative" style={{ position: 'relative' }}>
    {/* top-only faded shadow (full-viewport width) */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: -38,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        height: 18,
        pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(0,0,0,0.08), rgba(0,0,0,0.06) 25%, rgba(0,0,0,0))'
      }}
    />
    <div className="grid grid-cols-3 gap-6 text-center text-xl py-6 mb-1 bg-white">
          {['1','2','3','4','5','6','7','8','9','.','0','bk'].map(k => (
            <button key={k} type="button" onClick={() => { setFocused(true); press(k); }} className="py-4 text-2xl">
              {k === 'bk' ? <img src="/assets/icons/backspace.svg" alt="bk" className="h-6 w-6 mx-auto" /> : k}
            </button>
          ))}
        </div>

        <div className="pb-2">
          <button type="button" onClick={handleDone} className="w-full rounded-md bg-brand-600 text-white py-3">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
