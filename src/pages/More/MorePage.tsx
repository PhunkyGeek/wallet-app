import { useNavigate } from "react-router-dom";

const moreGroups = [
  {
    items: [
      { key: "bills", label: "Pay bills", icon: "/assets/moreicons/bills.svg", bg: "bg-purple-100" },
      { key: "transfer", label: "Transfer", icon: "/assets/moreicons/transfer.svg", bg: "bg-blue-100" },
      { key: "topup", label: "Topup", icon: "/assets/moreicons/topup.svg", bg: "bg-green-100" },
      { key: "withdraw", label: "Withdraw", icon: "/assets/moreicons/withdraw.svg", bg: "bg-red-100" },
      { key: "analytics", label: "Analytics", icon: "/assets/moreicons/analytics.svg", bg: "bg-purple-200" }
    ]
  },
  {
    items: [
      { key: "help", label: "Help", icon: "/assets/moreicons/help.svg", bg: "bg-yellow-100" },
      { key: "contact", label: "Contact us", icon: "/assets/moreicons/contact.svg", bg: "bg-teal-100" },
      { key: "about", label: "About", icon: "/assets/moreicons/about.svg", bg: "bg-purple-100" }
    ]
  }
];

export default function MorePage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6 pb-24">
        <h1 className="px-6 text-2xl font-bold">More</h1>

        <div className="mt-6">
          {/* First group */}
          <div className="px-4 rounded-lg bg-white overflow-hidden">
            {moreGroups[0].items.map((it, i) => (
              <div key={it.key}>
                <button
                    type="button"
                    onClick={() => {
                      if (it.key === 'bills') return nav('/bills/pay-to');
                      if (it.key === 'transfer') return nav('/transfer/to');
                      return nav(`/more/${it.key}`);
                    }}
                    className="w-full flex items-center gap-4 px-3 py-4 text-left bg-white"
                  >
                  <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${it.bg}`}>
                    <img src={it.icon} alt={it.label} className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-semibold text-ink">{it.label}</div>
                  </div>

                  <img src="/assets/icons/chevron-right.svg" alt="" className="h-4 w-4 opacity-60" />
                </button>

                {i !== moreGroups[0].items.length - 1 ? (
                  <div className="border-t border-gray-100 mx-3" />
                ) : null}
              </div>
            ))}
          </div>

          {/* Thick light divider */}
          <div className="h-2 bg-[#F5F7FA] my-6" />

          {/* Second group */}
          <div className="px-4 rounded-lg bg-white overflow-hidden">
            {moreGroups[1].items.map((it, i) => (
              <div key={it.key}>
                <button
                  type="button"
                  onClick={() => {
                    if (it.key === 'bills') return nav('/bills/pay-to');
                    if (it.key === 'transfer') return nav('/transfer/to');
                    return nav(`/more/${it.key}`);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-4 text-left bg-white"
                >
                  <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${it.bg}`}>
                    <img src={it.icon} alt={it.label} className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-semibold text-ink">{it.label}</div>
                  </div>

                  <img src="/assets/icons/chevron-right.svg" alt="" className="h-4 w-4 opacity-60" />
                </button>

                {i !== moreGroups[1].items.length - 1 ? (
                  <div className="border-t border-gray-100 mx-3" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
