import { useNavigate } from "react-router-dom";

export default function TransferFailurePage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-[#fff6f6] px-5 pt-10 pb-24 flex flex-col items-center">
      <div className="mt-12 mb-6">
        <svg
          width="163"
          height="126"
          viewBox="0 0 163 126"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="82" cy="63" r="63" fill="#E05555" />
          <rect x="46" y="40" width="72" height="86" rx="8" fill="white" />
          <path
            d="M82 67.6436L90.25 59.3936L92.6066 61.7502L84.3566 70.0002L92.6066 78.2502L90.25 80.6069L82 72.3569L73.75 80.6069L71.3933 78.2502L79.6433 70.0002L71.3933 61.7502L73.75 59.3936L82 67.6436Z"
            fill="#E05555"
          />
          <path
            d="M66 98H98"
            stroke="#BAC2C7"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M63 107H101"
            stroke="#BAC2C7"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M66 116H98"
            stroke="#BAC2C7"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="13" cy="8" r="8" fill="#FFD6D6" />
          <circle cx="155" cy="100" r="8" fill="#FFD6D6" />
          <circle cx="4.5" cy="99.5" r="4.5" fill="#FFD6D6" />
          <circle cx="154.5" cy="12.5" r="4.5" fill="#FFD6D6" />
        </svg>
      </div>

      <h2 className="text-lg font-semibold">Transfer Failed :(</h2>
      <p className="text-sm text-muted max-w-[320px] text-center mt-2">
        Your transfer has been declined due to a technical issue
      </p>

      <div className="mt-auto w-full px-5 pb-6">
        <button
          type="button"
          onClick={() => nav("/home")}
          className="w-full max-w-[360px] flex items-center justify-center mx-auto bg-brand-700 text-white py-3 rounded-md"
        >
          Back to wallet
        </button>
      </div>
    </div>
  );
}
