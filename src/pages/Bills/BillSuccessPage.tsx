import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BillSuccessPage() {
  const nav = useNavigate();
  const txn = "23010412432431";

  const [copied, setCopied] = useState(false);

  const copyTxn = async () => {
    try {
      await navigator.clipboard.writeText(txn);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-white px-5 pb-24">
      <div className="flex flex-col items-center pt-10">
        <div className="mb-6">
          <svg
            width="163"
            height="126"
            viewBox="0 0 163 126"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-40 h-32"
          >
            <circle cx="82" cy="63" r="63" fill="#4DA66B" />
            <rect x="46" y="40" width="72" height="86" rx="8" fill="white" />
            <path
              d="M78.6667 75.2865L93.9867 59.9648L96.3451 62.3215L78.6667 79.9998L68.0601 69.3932L70.4167 67.0365L78.6667 75.2865Z"
              fill="#4DA66B"
            />
            <path
              d="M66 98H98"
              stroke="#BAC2C7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M63 107H101"
              stroke="#BAC2C7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M66 116H98"
              stroke="#BAC2C7"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="13" cy="8" r="8" fill="#E6F7EC" />
            <circle cx="155" cy="100" r="8" fill="#E6F7EC" />
            <circle cx="4.5" cy="99.5" r="4.5" fill="#E6F7EC" />
            <circle cx="154.5" cy="12.5" r="4.5" fill="#E6F7EC" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-center">Payment done!</h2>
        <p className="text-sm text-muted text-center mt-2 max-w-[300px]">
          Bill payment has been done successfully
        </p>
      </div>

      <div className="mt-28 text-sm font-semibold">Payment details</div>

      <div className="mt-3 space-y-3">
        <div className="border rounded-lg p-3">
          <div className="text-xs text-muted">Biller</div>
          <div className="text-sm font-semibold">Electricity company inc.</div>
        </div>

        <div className="border rounded-lg p-3">
          <div className="text-xs text-muted">Amount</div>
          <div className="text-sm font-semibold">$132.32</div>
        </div>

        <div className="border rounded-lg p-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted">Transaction no.</div>
            <div className="text-sm font-semibold">{txn}</div>
          </div>

          <button type="button" onClick={copyTxn} className="text-muted">
            <img src="/assets/icons/copy.svg" alt="copy" className="h-4 w-4" />
          </button>
        </div>
        {copied && (
          <div className="fixed left-1/2 bottom-28 z-60 -translate-x-1/2">
            <div className="rounded-full bg-black/90 px-4 py-2 text-sm text-white shadow">
              Copied
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 mb-36 text-red-600 flex items-center justify-center gap-2">
        <img src="/assets/icons/flag.svg" alt="copy" className="h-4 w-4" />
        <button type="button" className="text-red-600 font-medium">
          Report a problem
        </button>
      </div>

      <div className="left-0 right-0 bottom-10 flex justify-center px-5">
        <button
          type="button"
          onClick={() => nav("/home")}
          className="w-full max-w-[360px] rounded-md bg-brand-600 text-white py-3"
        >
          Back to wallet
        </button>
      </div>
    </div>
  );
}
