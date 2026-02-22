import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandBar } from "@/components/auth/BrandBar";

function formatOtpDisplay(code: string) {
  // return a padded display like XXX-XXX where digits replace X
  const padded = (code + "XXXXXX").slice(0, 6);
  const left = padded.slice(0, 3);
  const right = padded.slice(3, 6);
  return `${left}-${right}`;
}

function KeyButton({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-14 w-20 rounded-xl text-[26px] font-medium text-ink active:bg-black/5"
    >
      {children}
    </button>
  );
}

export default function OtpPage() {
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(32);

  const done = code.length === 6;

  useEffect(() => {
    const t = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  const display = useMemo(() => formatOtpDisplay(code), [code]);

  // handle keyboard numeric input and backspace
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // allow number keys from main keyboard and numpad
      if (/^[0-9]$/.test(e.key)) {
        setCode((c) => (c.length >= 6 ? c : c + e.key));
        return;
      }
      if (e.key === "Backspace") {
        setCode((c) => c.slice(0, -1));
        return;
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function pressDigit(d: string) {
    setCode((c) => (c.length >= 6 ? c : c + d));
  }
  function backspace() {
    setCode((c) => c.slice(0, -1));
  }

  const resendColor = done ? "text-blue-600" : "text-muted";
  const underline = done ? "bg-green-500" : "bg-brand-500";

  return (
    <div className="min-h-dvh bg-white">
      <BrandBar showBack backTo="/auth/password" />

      <div className="px-6 pb-0 pt-4">
        <div className="text-center text-[14px] font-semibold text-ink">
          An SMS sent to your mobile number
          <br />
          <span className="font-semibold">+962 79 XXX-XXXX</span>
        </div>

        <div className="mt-8 text-center text-[13px] text-muted">Enter six-digit code</div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="text-[44px] font-medium tracking-wide">
            {/* render each character so we can color placeholders (X) grey and digits black */}
            {Array.from(display).map((ch, idx) => {
              const isPlaceholder = ch === "X";
              const isDash = ch === "-";
              const cls = isDash ? "text-muted" : isPlaceholder ? "text-muted" : "text-ink";
              // keep consistent spacing for dashes
              return (
                <span key={idx} className={cls}>
                  {ch}
                </span>
              );
            })}
          </div>
          {done ? (
            <div
              aria-label="Verified"
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-green-500 text-[14px] text-green-600"
            >
              ✓
            </div>
          ) : null}
        </div>
        <div className="mx-auto mt-2 h-[2px] w-[210px]">
          <div className={`h-full w-full ${underline}`} />
        </div>

        <div className="mt-6 pb-24 text-center text-[14px]">
          <span className={resendColor}>Resend code</span>
          <span className="ml-2 text-ink">{`00:${String(seconds).padStart(2, "0")}`}</span>
        </div>
      </div>

      {/* keypad section */}
      <div className="mt-10 shadow-inner border-black/5 bg-white px-6 pb-8 pt-8">
        <div className="mx-auto grid max-w-[360px] grid-cols-3 justify-items-center gap-y-4">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
            <KeyButton key={n} onClick={() => pressDigit(n)}>
              {n}
            </KeyButton>
          ))}
          <div />
          <KeyButton onClick={() => pressDigit("0")}>0</KeyButton>
          {/* Backspace rendered as an <img> per request. Keep click and keyboard activation. */}
          <img
            src="/assets/icons/backspace.svg"
            alt="Backspace"
            role="button"
            tabIndex={0}
            onClick={backspace}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") backspace();
            }}
            className="h-14 w-20 rounded-xl p-3 text-ink cursor-pointer"
          />
        </div>

        <button
          type="button"
          onClick={() => nav("/home")}
          disabled={!done}
          className="mx-auto mt-10 block h-12 w-full max-w-[360px] rounded-md bg-brand-500 text-[15px] font-semibold text-white disabled:opacity-60"
        >
          Done
        </button>
      </div>
    </div>
  );
}
