import { Fragment, useEffect } from "react";

type Props = {
  open: boolean;
  bill: any | null;
  onClose: () => void;
  onSecure: () => void;
};

export default function BillDetailsSheet({ open, bill, onClose, onSecure }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open || !bill) return null;

  return (
    <Fragment>
      {/* backdrop (fixed to viewport so it overlays nav and other fixed elements) */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 bg-black/55 z-[90]"
      />

      {/* sheet: reuse same sizing as project's BottomSheet component */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[420px] md:max-w-full rounded-t-2xl bg-white dark:bg-[#0B0F1A] px-5 pb-8 pt-4 shadow-2xl z-[100]"
        style={{ paddingBottom: "max(32px, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center justify-end">
          <button type="button" onClick={onClose} className="text-[15px] font-medium text-blue-600">
            Done
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-purple-100 grid place-items-center">
                <img src={bill.icon || "/assets/payicons/Bill.svg"} alt="" className="h-6 w-6" />
              </div>

              <div>
                <div className="font-semibold">{bill.label}</div>
                <div className="text-sm text-muted">Utility</div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-3 text-center">
            <div className="text-red-700 font-semibold">Due: {bill.amount}</div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-line dark:border-white/10 bg-white dark:bg-[#0B0F1A] p-3">
              <div className="text-xs text-muted">Due date</div>
              <div className="text-sm">{bill.dueDate}</div>
            </div>

            <div className="rounded-xl border border-line dark:border-white/10 bg-white dark:bg-[#0B0F1A] p-3">
              <div className="text-xs text-muted">Registration no.</div>
              <div className="text-sm">{bill.reg}</div>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={onSecure}
              className="w-full bg-yellow-400 text-purple-800 font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <img src="/assets/payicons/secure.svg" alt="" className="h-5 w-5" />
              <span>Secure payment</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
