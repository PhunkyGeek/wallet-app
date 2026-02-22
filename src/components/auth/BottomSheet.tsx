import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  open: boolean;
  title: string;
  onClose: () => void;
  rightActionLabel?: string;
};

export function BottomSheet({ open, title, onClose, rightActionLabel = "Done", children }: Props) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[80]">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/55"
      />

      {/* sheet */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-[420px] md:max-w-full rounded-t-2xl bg-white dark:bg-[#0B0F1A] px-5 pb-8 pt-4 shadow-2xl"
        style={{ paddingBottom: "max(32px, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center justify-end">
          {/* <div className="text-[17px] font-semibold text-ink">{title}</div> */}
          <button type="button" onClick={onClose} className="text-[15px] font-medium text-blue-600">
            {rightActionLabel}
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
