import { Link, useNavigate } from "react-router-dom";

type Props = {
  showBack?: boolean;
  backTo?: string;
  className?: string;
};

export function BrandBar({ showBack = false, backTo, className }: Props) {
  const nav = useNavigate();
  return (
    <div
      className={
        "relative flex items-center justify-center px-5 pt-6 pb-6" +
        (className ?? "")
      }
      style={{ paddingTop: "max(24px, env(safe-area-inset-top))" }}
    >
      {showBack ? (
        <button
          type="button"
          onClick={() => (backTo ? nav(backTo) : nav(-1))}
          className="absolute left-4 flex items-center gap-1 text-[15px] font-medium text-blue-600 mb-6"
        >
          <span className="text-lg">‹</span> Back
        </button>
      ) : null}

      <Link to="/auth/mobile" className="flex items-center gap-1.5">
        <img src="/assets/logo-2.svg" alt="Tap'nPay" className="h-10 w-auto" />
      </Link>
    </div>
  );
}
