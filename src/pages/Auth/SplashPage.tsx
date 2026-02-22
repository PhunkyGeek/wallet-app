import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashPage() {
  const nav = useNavigate();

  useEffect(() => {
    const t = window.setTimeout(() => nav("/auth/mobile", { replace: true }), 3000);
    return () => window.clearTimeout(t);
  }, [nav]);

  return (
    <div className="min-h-dvh w-full bg-brand-500 flex items-center justify-center">
      <div className="flex items-center gap-2">

        {/* LOGO */}
        <img
          src="/assets/logo.svg"
          alt="Tap'nPay"
          className="h-10 w-auto"
        />

      </div>
    </div>
  );
}