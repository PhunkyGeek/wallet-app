import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandBar } from "@/components/auth/BrandBar";
import { Eye, EyeOff } from "lucide-react";

function SocialButton({ src, alt }: { src: string; alt: string }) {
  return (
    <button
      type="button"
      className="flex h-12 w-full items-center justify-center rounded-md border border-line bg-white"
      aria-label={alt}
    >
      <img src={src} alt={alt} className="h-6 w-6" />
    </button>
  );
}

export default function SignupPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [accept, setAccept] = useState(false);

  const canSubmit = useMemo(() => {
    return name.trim().length > 1 && email.includes("@");
  }, [name, email]);

  return (
    <div className="min-h-dvh bg-white">
      <BrandBar showBack backTo="/auth/password" />

      <div className="px-6 pb-10 pt-8 mt-36">
        <h1 className="text-[28px] font-bold text-ink">Create Account</h1>

        <div className="mt-7 space-y-5">
          <div>
            <div className="text-[13px] font-medium text-ink">Name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="mt-2 h-12 w-full rounded-md border border-line px-3 text-[14px] outline-none placeholder:text-[#B8BDC7] focus:border-[#5B35D5] focus:ring-2 focus:ring-[#5B35D5]/20"
            />
          </div>

          <div>
            <div className="text-[13px] font-medium text-ink">Email</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. email@example.com"
              className="mt-2 h-12 w-full rounded-md border border-line px-3 text-[14px] outline-none placeholder:text-[#B8BDC7] focus:border-[#5B35D5] focus:ring-2 focus:ring-[#5B35D5]/20"
            />
          </div>

          <div>
            <div className="text-[13px] font-medium text-ink">Password</div>
            <div className="mt-2 flex h-12 items-center rounded-md border border-line bg-white px-3 focus-within:border-[#5B35D5] focus-within:ring-2 focus-within:ring-[#5B35D5]/20">
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
        </div>

        <label className="mt-5 flex items-center gap-3 text-[13px] text-ink">
          <input
            type="checkbox"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
            className="h-4 w-4"
          />
          <span>
            I accept{" "}
            <span className="text-blue-600">terms and conditions</span> and{" "}
            <span className="text-blue-600">privacy policy</span>
          </span>
        </label>

        <button
          type="button"
          onClick={() => nav("/auth/otp")}
          disabled={!canSubmit || !accept}
          className="mt-8 h-12 w-full rounded-md bg-brand-500 text-[15px] font-semibold text-white disabled:opacity-60"
        >
          Create a new account
        </button>

        <div className="mt-7 flex items-center gap-3 text-xs text-muted">
          <div className="h-px flex-1 bg-line" />
          <div>or continue using</div>
          <div className="h-px flex-1 bg-line" />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4">
          <SocialButton src="/assets/icons/facebook.svg" alt="Facebook" />
          <SocialButton src="/assets/icons/google.svg" alt="Google" />
          <SocialButton src="/assets/icons/apple.svg" alt="Apple" />
        </div>
      </div>
    </div>
  );
}
