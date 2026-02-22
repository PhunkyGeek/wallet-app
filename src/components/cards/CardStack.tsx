import React from "react";

export type Card = {
  id: number;
  owner?: string;
  last4?: string;
  img: string;
};

export function CardStack({
  cards,
  onSelect,
  stripHeight = 48,
  offset = 35,
  maxWidth = 360,
  fullCardHeight = 200
}: {
  cards: Card[];
  onSelect?: (c: Card) => void;
  stripHeight?: number;
  offset?: number;
  maxWidth?: number;
  fullCardHeight?: number;
}) {
  // compute container height so all strips and the full card fit
  const totalHeight = (cards.length - 1) * offset + fullCardHeight + 15;

  return (
    <div className="w-full flex justify-center">
      <div className="relative" style={{ width: Math.min(maxWidth, 360), height: totalHeight }}>
        {cards.map((c, i) => {
          const isLast = i === cards.length - 1;
          const translateY = i * offset;
          if (!isLast) {
            // small strip on top of the stack
            const z = 300 + i; // higher z so strips appear above the full card
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelect?.(c)}
                className="absolute left-0 w-full -mt-1"
                style={{ transform: `translateY(${translateY}px)`}}
              >
                <div className="overflow-hidden rounded-t-2xl w-full" aria-hidden>
                  <img src={c.img} alt={`card-${c.id}`} className="w-full h-full object-cover" />
                </div>
              </button>
            );
          }

          // last item: render full card below the strips
          const fullZ = 200;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect?.(c)}
              className="absolute left-0 w-full"
              style={{ transform: `translateY(${translateY}px)`, zIndex: fullZ }}
            >
              <div
                className="rounded-2xl w-full overflow-hidden shadow-2xl"
                style={{ height: fullCardHeight }}
                aria-hidden
              >
                <img src={c.img} alt={`card-${c.id}`} className="w-full h-full object-cover" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CardStack;
