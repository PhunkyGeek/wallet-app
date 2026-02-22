import { motion } from "framer-motion";
import { useMemo, useState } from "react";
// BottomNav is rendered persistently by AppFrame
import { BalanceCard } from "@/components/wallet/BalanceCard";
import { RecentTransfers } from "@/components/wallet/RecentTransfers";
import { type Filter } from "@/components/wallet/TransactionFilters";
import { TransactionList } from "@/components/wallet/TransactionList";
import { transactions } from "@/data/transactions";
import { useAuthStore } from "@/store/auth.store";
import { Avatar } from "@/components/ui/Avatar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  // active tab state is handled by the persistent BottomNav in AppFrame

  const balance = 14235.34;
  const avatarName = user?.name ? user.name.toLowerCase().replace(/\s+/g, "_") : undefined;
  const avatarSrc = avatarName ? `/assets/avatars/${avatarName}` : undefined; // Avatar will try .svg then .png

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions
      // remove filter chips: always show all on home
      .filter(() => true)
      .filter((t) => {
        if (!q) return true;
        return (t.merchant + " " + t.subtitle).toLowerCase().includes(q);
      });
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-[720px] flex flex-col"
    >
  {/* Header */}
  <div className="page-header relative bg-gradient-to-b from-brand-700 to-brand-700 px-5 pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10">
              {/* clicking the avatar opens profile settings */}
              <button type="button" onClick={() => navigate('/profile')} className="rounded-full">
                <Avatar name={user?.name ?? "User"} src={avatarSrc} size={40} className="ring-1 ring-white/20" />
              </button>
            </div>
            <div className="text-white">
              <p className="text-xs text-white/70">Hello,</p>
              <p className="text-sm font-semibold">{user?.name ?? "User"}!</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="h-9 w-9 rounded-xl grid place-items-center text-white/90 hover:text-white transition"
            aria-label="Settings"
          >
            <img src="/assets/icons/cog.svg" alt="settings" className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4">
          <BalanceCard balance={balance} />
        </div>
      </div>

      {/* Content */}
  <div className="flex-1 bg-white px-5 pb-24">
        <RecentTransfers />

        <section className="mt-4">
          <div className="flex items-end justify-between">
            <h3 className="text-xs font-semibold text-ink">Latest Transactions</h3>
            <button type="button" onClick={() => navigate('/transactions')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
              View all
            </button>
          </div>

          <div className="mt-3 grid gap-3">
            <TransactionList items={filtered} />
          </div>
        </section>
      </div>

    </motion.div>
  );
}
