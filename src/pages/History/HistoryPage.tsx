import { useMemo, useState } from "react";
import { transactions as allTx } from "@/data/transactions";
import { LogoBadge } from "@/components/wallet/LogoBadge";
import { BottomSheet } from "@/components/auth/BottomSheet";
import { signMoney } from "@/lib/format";

function groupTransactions(txs: typeof allTx) {
  const groups: Record<string, typeof allTx> = {};
  for (const tx of txs) {
    const key = (() => {
      if (tx.subtitle.startsWith("Today")) return "Today";
      if (tx.subtitle.startsWith("Yesterday")) return "Yesterday";
      // Extract a month+day like 'Dec 24' from 'Dec 24 13:53' or 'Dec 24'
      const m = tx.subtitle.match(/([A-Za-z]+\s+\d{1,2})/);
      if (m) return m[1];
      // fallback: use the subtitle date prefix (without time)
      return tx.subtitle.split("\n")[0] ?? tx.subtitle;
    })();
    groups[key] = groups[key] ?? [];
    groups[key].push(tx);
  }
  return groups;
}

export default function HistoryPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof allTx[number] | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTx.filter((t) => (t.merchant + " " + t.subtitle).toLowerCase().includes(q));
  }, [query]);

  const groups = useMemo(() => groupTransactions(filtered), [filtered]);

  const formatGroupTitle = (key: string) => {
    // For Today/Yesterday just return the key as-is
    if (key === "Today" || key === "Yesterday") return { day: key, date: "" };

    // Attempt to parse month/day from keys like 'Dec 24' or 'Dec 24 13:53'
    const m = key.match(/([A-Za-z]+)\s+(\d{1,2})/);
    if (!m) return { day: key, date: "" };
    const month = m[1];
    const dayNum = parseInt(m[2], 10);
    // assume year 2022 if not provided (data samples are 2022)
    const parseStr = `${month} ${dayNum} 2022`;
    const d = new Date(parseStr);
    if (isNaN(d.getTime())) return { day: key, date: "" };
    const weekday = d.toLocaleDateString(undefined, { weekday: "long" });
    const longDate = d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    return { day: weekday, date: longDate };
  };

  return (
    <div className="min-h-[720px] flex flex-col">
  <header className="px-5 pt-5 pb-4">
        <h1 className="text-xl font-bold text-ink">History</h1>

        <div className="mt-4 flex gap-3">
            <label className="relative flex-1 block">
            <span className="sr-only">Search</span>
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <img src="/assets/icons/search.svg" alt="Search" className="h-4 w-4" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Value goes here"
                className="w-full rounded-md border border-line bg-white py-2 pl-10 pr-3 text-sm placeholder:text-muted focus:border-[#5B35D5] focus:ring-2 focus:ring-[#5B35D5]/20"
            />
          </label>

          <button type="button" className="rounded-md border border-line bg-white px-3 py-2 text-sm flex items-center gap-2">
            <img src="/assets/icons/filter.svg" alt="Filter" className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </header>

  <main className="flex-1 bg-white pb-24">
        {Object.keys(groups).length === 0 ? (
          <div className="py-8 text-center text-muted">No transactions</div>
        ) : (
          Object.entries(groups).map(([title, items], idx) => {
            const { day, date } = formatGroupTitle(title);
            return (
              <section key={title} className={`${idx > 0 ? "pt-4  border-line mt-4" : "mt-4"}`}>
                <div className="mb-3 px-8">
                  {day === "Today" || day === "Yesterday" ? (
                    <h3 className="text-xs text-muted font-medium">{day}</h3>
                  ) : (
                    <>
                      <div className="text-xs text-muted">{day}</div>
                      <div className="text-sm font-semibold text-ink">{date}</div>
                    </>
                  )}
                </div>

                <div className="px-4">
                  {items.map((tx, i) => (
                    <button
                      key={tx.id}
                      type="button"
                      onClick={() => setSelected(tx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left ${i < items.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <LogoBadge logo={tx.logo} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{tx.merchant}</p>
                        <p className="text-xs text-muted">{tx.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold ${tx.amount < 0 ? "text-red-500" : "text-emerald-600"}`}>
                          {signMoney(tx.amount)}
                        </p>
                        <img src="/assets/icons/chevron-right.svg" alt="open" className="h-4 w-4 text-muted" />
                      </div>
                    </button>
                  ))}
                </div>
                {idx < Object.keys(groups).length - 1 ? (
                  <div className="h-2 mt-8 mb-6 w-full bg-gray-100" aria-hidden="true" />
                ) : null}
              </section>
            );
          })
        )}
      </main>

      <BottomSheet open={!!selected} title={selected?.merchant ?? ""} onClose={() => setSelected(null)} rightActionLabel="Done">
        {selected && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                <div className="h-12 w-12">
                  <LogoBadge logo={selected.logo} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{selected.merchant}</div>
                  <div className="text-xs text-muted">Retailer corporation</div>
                </div>
              </div>
              {/* <button type="button" className="text-sm font-medium text-blue-600">Done</button> */}
            </div>

            <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-6 text-center">
              <div className={`text-lg font-semibold ${selected.amount < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {signMoney(selected.amount)}
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-xl border border-line bg-white p-3">
                <div className="text-xs text-muted">Today</div>
                <div className="text-sm font-medium">{selected.subtitle}</div>
              </div>

              <div className="rounded-xl border border-line bg-white p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted">Transaction no.</div>
                  <div className="text-sm font-medium">{`23${selected.id}01412432431`}</div>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard?.writeText(`23${selected.id}01412432431`);
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 1400);
                    } catch (e) {
                      // ignore
                    }
                  }}
                  className="text-muted"
                  aria-label="Copy transaction number"
                >
                  <img src="/assets/icons/copy.svg" alt="Copy" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 text-center flex items-center justify-center">
              <button type="button" className="text-sm font-medium text-red-600 flex items-center justify-center gap-2">
                <img src="/assets/icons/flag.svg" alt="Report" className="h-4 w-4" />
                Report a problem
              </button>
            </div>

            {copied && (
              <div className="fixed left-1/2 bottom-28 z-60 -translate-x-1/2">
                <div className="rounded-full bg-black/90 px-4 py-2 text-sm text-white shadow">Copied</div>
              </div>
            )}
          </>
        )}
      </BottomSheet>
    </div>
  );
}
