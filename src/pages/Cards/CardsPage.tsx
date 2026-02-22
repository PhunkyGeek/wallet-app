import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import CardStack, { type Card } from "@/components/cards/CardStack";

const cards: Card[] = [
  { id: 1, owner: "Abdullah Ghatasheh", last4: "3245", img: "/assets/cards/Card-3.svg" },
  { id: 2, owner: "Abdullah Ghatasheh", last4: "5432", img: "/assets/cards/Card-2.svg" },
  { id: 3, owner: "Abdullah Ghatasheh", last4: "2312", img: "/assets/cards/Card-x.svg" }
];

export default function CardsPage() {
  const navigate = useNavigate();

  const stacked = useMemo(() => cards, []);

  return (
    <div className="min-h-[720px] flex flex-col bg-white mb-48 px-5 pb-24">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold">My Cards</h1>
        <button type="button" className="text-sm text-brand-600 font-medium">Add card +</button>
      </header>

      <div className="mt-6">
        <CardStack
          cards={stacked}
          stripHeight={48}
          offset={35}
          maxWidth={360}
          onSelect={(c) => navigate('/card-payment', { state: { card: c } })}
        />
      </div>

      <div className="flex-1" />
    </div>
  );
}
