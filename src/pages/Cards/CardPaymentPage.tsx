import { useLocation, useNavigate } from "react-router-dom";

export default function CardPaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // Provide backwards-compatible variables used by the back button markup
  const nav = navigate;
  const backTo = state?.backTo;

  const card = state?.card ?? { id: 1, img: "/assets/cards/Card%203.svg", owner: "Abdullah", last4: "3245" };

  return (
    <div className="relative min-h-[720px] flex flex-col bg-white px-5 pb-36">
      <header className="page-header flex items-center gap-3 py-4">
         <button type="button" onClick={() => nav(-1)} className="text-blue-600 mb-6">
        <span className="text-lg">‹</span> Back
      </button>
      </header>

      <main className="flex flex-col items-center mt-12">
        <div className="w-full max-w-[360px] rounded-2xl overflow-hidden shadow-lg">
          <img src={card.img} alt={`card-${card.id}`} className="w-full h-50 object-cover" />
        </div>

        <div className="mt-36 text-center text-muted">
          {/* NFC icon placeholder using requested <img> format */}
          <div className="flex items-center justify-center">
            <img src="/assets/icons/nfc.svg" alt="NFC" className="h-6 w-6" />
          </div>
          <div className="mt-3 text-sm text-muted">Move near a device to pay</div>
        </div>

        {/* Spacer so content isn't hidden by the fixed bottom button */}
        <div className="mt-12 w-full max-w-[360px]" aria-hidden />
        <button
          type="button"
          className="w-full mt-52 -mb-14 max-w-[360px] rounded-md bg-brand-700 text-white py-3 flex items-center justify-center shadow-lg"
        >
          <img src="/assets/icons/qr.svg" alt="QR" className="h-4 w-4 mr-2" />
          <span>QR Pay</span>
        </button>
      </main>
    </div>
  );
}
