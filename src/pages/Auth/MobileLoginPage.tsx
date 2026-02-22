import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandBar } from "@/components/auth/BrandBar";
import { PhoneField } from "@/components/ui/PhoneField";
import type { Value } from "react-phone-number-input";

export default function MobileLoginPage() {
  const nav = useNavigate();
  const [phone, setPhone] = useState<Value | undefined>(undefined);

  const canContinue = useMemo(() => {
    const digits = phone ? String(phone).replace(/\D/g, "") : "";
    return digits.length >= 10;
  }, [phone]);

  return (
    <div className="min-h-dvh bg-white">
      {/* Top purple area with brand and illustration */}
      <div className="bg-[#F7F3FF] dark:bg-[#061025] pb-10 pt-6">
        <div className="mx-auto px-6">
          <BrandBar />

          <img
            src="/assets/mobile.svg"
            alt="Phone illustration"
            className="mx-auto mt-11 mb-10 h-[220px] w-auto select-none"
          />
        </div>
      </div>

      {/* Bottom white sheet that overlaps the purple area */}
      <div className="mt-6 bg-white px-6 pb-10 pt-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-[32px] font-bold leading-[1.05] text-ink">
            Enter your
            <br />
            mobile number
          </h1>

          <div className="mt-6">
            

            <div className="mt-2">
              
                <PhoneField
                  value={phone}
                  onChange={setPhone}
                  defaultCountry={"JO"}
                  placeholder="7X-XXXXXXX"
                />
              
            </div>
          </div>

          <button
            type="button"
            onClick={() => nav("/auth/password")}
            disabled={!canContinue}
            className="mt-8 h-12 w-full rounded-md bg-brand-500 text-[15px] font-semibold text-white disabled:opacity-60"
          >
            Continue
          </button>

          <div className="mt-7 flex items-center gap-3 text-xs text-muted">
            <div className="h-px flex-1 bg-line" />
            <div>or continue using</div>
            <div className="h-px flex-1 bg-line" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            <button className="flex h-12 w-full items-center justify-center rounded-md border border-line bg-white">
              <img src="/assets/icons/facebook.svg" alt="Facebook" className="h-6 w-6" />
            </button>
            <button className="flex h-12 w-full items-center justify-center rounded-md border border-line bg-white">
              <img src="/assets/icons/google.svg" alt="Google" className="h-6 w-6" />
            </button>
            <button className="flex h-12 w-full items-center justify-center rounded-md border border-line bg-white">
              <img src="/assets/icons/apple.svg" alt="Apple" className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-7 text-center text-[13px] text-muted">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => nav("/auth/signup")}
              className="font-semibold text-blue-600"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}