import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useRef } from "react";

function formatAmount(raw: string | number | undefined) {
  if (raw === undefined || raw === null || raw === "") return "$0.00";
  const num = Number(raw);
  if (isNaN(num)) return "$0.00";
  return num.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export default function TransferSecurePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { state } = useLocation() as { state?: { amount?: string } };
  const amountRaw = state?.amount ?? "";
  const display = useMemo(() => formatAmount(amountRaw), [amountRaw]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSecure = () => {
    // simulate processing then route to failure
    setTimeout(() => nav("/transfer/failure"), 600);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white px-5 pt-6 pb-36 flex flex-col items-center">
      <div className="w-full">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="text-blue-600 self-start mb-28"
        >
          <span className="text-lg">‹</span> Back
        </button>

        <h1 className="text-center text-2xl font-semibold mb-16">Transfer to</h1>

        <div className="flex items-center gap-3 justify-center mb-28">
          <div className="h-16 w-16 rounded-full bg-gray-100 grid place-items-center overflow-hidden">
            {/* avatar placeholder */}
            <img
              src="/assets/avatars/ahmed.svg"
              alt="avatar"
              className="h-16 w-16 object-cover"
            />
          </div>
          <div>
            <div className="font-semibold">Ali Ahmed</div>
            <div className="text-sm text-muted">+1-300-555-0161</div>
          </div>
        </div>

        <div className="text-center text-sm text-muted mb-3">Enter Amount</div>

        <div className="text-center">
          <div className="text-4xl font-semibold mb-2 text-black">
            {display}
          </div>
          <div className="h-0.5 w-full max-w-[220px] mx-auto bg-gray-400" />
        </div>

        {/* spacer so content doesn't hit the sticky button */}
        <div style={{ height: 120 }} />

        {/* sticky bottom secure button */}
        <div className="flex items-center justify-center mt-48 px-5">
          <button
            type="button"
            onClick={handleSecure}
            className="w-full  max-w-[360px] rounded-md bg-yellow-400 text-purple-800 font-semibold py-3.5 flex items-center justify-center gap-3 shadow-md"
          >
            {/* lock icon placeholder */}
            <span className="inline-flex items-center justify-center">
              <img
                src="/assets/payicons/secure.svg"
                alt=""
                className="h-5 w-5"
              />
            </span>

            <span>Secure payment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
