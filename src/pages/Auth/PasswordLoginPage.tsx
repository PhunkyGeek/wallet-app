import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandBar } from "@/components/auth/BrandBar";
import { BottomSheet } from "@/components/auth/BottomSheet";
import { PhoneInput } from "react-international-phone";
import { useAuthStore } from "@/store/auth.store";
import { Eye, EyeOff } from "lucide-react";

type ForgotMode = "email" | "mobile";

export default function PasswordLoginPage() {
  const nav = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotMode, setForgotMode] = useState<ForgotMode>("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMobile, setForgotMobile] = useState("");

  const canLogin = useMemo(() => password.trim().length >= 6, [password]);

  async function onLogin() {
    if (!canLogin) return;
    setLoading(true);
    try {
      await login();
      nav("/home");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-white">
      {/* Top purple area with brand and illustration */}
  <div className="bg-[#F7F3FF] dark:bg-[#061025] pb-10 pt-6">
        <div className="mx-auto px-6">
          <BrandBar showBack />
          <img
            src="/assets/secure.svg"
            alt="Phone illustration"
            className="mx-auto mt-11 mb-10 h-[220px] w-auto select-none"
          />
        </div>
      </div>

  {/* Bottom white sheet that overlaps the purple area */}
  <div className="mt-6 bg-white px-6 pb-10 pt-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-[32px] font-bold leading-[1.1] text-ink">Enter your password</h1>

          <div className="mt-6">
            <div className="text-[13px] font-medium text-ink">Password</div>
            <div className="mt-2">
              <div className="rounded-lg border border-line bg-white flex items-center h-12 px-3 focus-within:border-[#5B35D5] focus-within:ring-2 focus-within:ring-[#5B35D5]/20">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-[#B8BDC7]"
                />
                <button
                  type="button"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow((s) => !s)}
                  className="ml-2 text-muted"
                >
                  {show ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setForgotMode("email");
                  setForgotOpen(true);
                }}
                className="text-[13px] font-semibold text-blue-600"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogin}
            disabled={!canLogin || loading}
            className="mt-10 h-12 w-full rounded-md bg-brand-500 text-[15px] font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Login"}
          </button>

          <div className="mt-7 text-center text-[13px] text-muted">
            New here?{" "}
            <button type="button" onClick={() => nav("/auth/signup")} className="font-semibold text-blue-600 no-underline">
              Sign up
            </button>
          </div>
        </div>
      </div>

      <BottomSheet
        open={forgotOpen}
        title="Forgot your password?"
        onClose={() => setForgotOpen(false)}
      >
        {forgotMode === "email" ? (
          <>
            <div className="text-[13px] font-medium text-ink">Email</div>
            <input
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="e.g. email@example.com"
              className="mt-2 h-12 w-full rounded-lg border border-line px-3 text-[14px] outline-none placeholder:text-[#B8BDC7]"
            />

            <button
              type="button"
              className="mt-6 h-12 w-full rounded-lg bg-brand-500 text-[15px] font-semibold text-white"
              onClick={() => setForgotOpen(false)}
            >
              Send reset link
            </button>

            <button
              type="button"
              className="mt-4 w-full text-center text-[14px] font-semibold text-blue-600"
              onClick={() => setForgotMode("mobile")}
            >
              Use mobile instead
            </button>
          </>
        ) : (
          <>
              <div className="text-[13px] font-medium text-ink">Mobile number</div>
              <div className="mt-2">
                <div className="phone-field-wrapper rounded-lg border border-line bg-white flex items-center h-12">
                  <style>{`
                    .phone-field-wrapper input {
                      border: 0 !important;
                      background: transparent !important;
                      box-shadow: none !important;
                      height: 100% !important;
                      padding: 0 0.75rem !important;
                      order: 3 !important;
                      flex: 1 1 auto !important;
                    }
                    .phone-field-wrapper button {
                      border: 0 !important;
                      background: transparent !important;
                      box-shadow: none !important;
                      padding: 0 0.5rem !important;
                      display: flex !important;
                      align-items: center !important;
                      gap: .5rem !important;
                      order: 0 !important;
                    }
                    .phone-field-wrapper button img { order: 0 !important; }
                    .phone-field-wrapper button .react-international-phone__country-code,
                    .phone-field-wrapper button .selected-dial-code,
                    .phone-field-wrapper button .dial-code { order: 1 !important; font-weight: 600 !important; }
                    .phone-field-wrapper button .react-international-phone__caret,
                    .phone-field-wrapper button .caret,
                    .phone-field-wrapper button svg { order: 2 !important; }
                  `}</style>

                  <PhoneInput
                    defaultCountry="jo"
                    value={forgotMobile}
                    onChange={(val) => setForgotMobile(val)}
                    className="h-full flex-1"
                    placeholder="7X-XXXXXXX"
                    inputClassName="h-full w-full bg-transparent px-3 text-[14px] outline-none placeholder:text-[#B8BDC7] border-0"
                    countrySelectorStyleProps={{
                      buttonClassName: "h-full flex items-center gap-2 bg-transparent px-3 border-0 min-w-[88px]",
                    }}
                  />
                </div>
              </div>

            <button
              type="button"
              className="mt-6 h-12 w-full rounded-lg bg-brand-500 text-[15px] font-semibold text-white"
              onClick={() => setForgotOpen(false)}
            >
              Send reset link
            </button>

            <button
              type="button"
              className="mt-4 w-full text-center text-[14px] font-semibold text-blue-600"
              onClick={() => setForgotMode("email")}
            >
              Use email instead
            </button>
          </>
        )}
      </BottomSheet>
    </div>
  );
}
