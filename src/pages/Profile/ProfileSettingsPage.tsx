import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/auth.store";
import { useThemeStore } from "@/store/theme.store";
import { useEffect, useState } from "react";

export default function ProfileSettingsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const avatarName = user?.name ? user.name.toLowerCase().replace(/\s+/g, "_") : undefined;
  const avatarSrc = avatarName ? `/assets/avatars/${avatarName}` : undefined;

  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const [local, setLocal] = useState(theme);

  useEffect(() => setLocal(theme), [theme]);

  const toggle = () => {
    const next = local === "dark" ? "light" : "dark";
    setTheme(next as any);
    setLocal(next as any);
  };

  return (
    <div className="min-h-[720px] flex flex-col bg-white dark:bg-[#0B0F1A] px-5">
      <header className="flex items-center gap-3 py-4">
         <button type="button" onClick={() => navigate(-1)} className="text-blue-600 mb-16">
        <span className="text-lg">‹</span> Back
      </button>
      </header>

      <div className="flex flex-col items-center py-6">
        <div className="relative h-28 w-28 rounded-full ring-4 ring-emerald-400 grid place-items-center overflow-visible">
          <Avatar name={user?.name ?? "User"} src={avatarSrc} size={105} />
          {/* shield badge bottom-right */}
          <div className="absolute -bottom-2 -right-0 h-8 w-8 rounded-full bg-emerald-500 ring-2 ring-white grid place-items-center z-50">
            <img src="/assets/profileicons/account-shield.svg" alt="Verified" className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm font-semibold text-ink">{"Abdullah Ghatasheh"}</div>
          <div className="text-xs text-muted">Joined 2 years ago</div>
        </div>
      </div>

      <div className="mt-6 mb-96 w-full space-y-3">
        <div className="flex items-center gap-3 border-b border-line dark:border-white/10 bg-white dark:bg-transparent p-4">
          <div className="h-9 w-9 rounded-md bg-purple-100 grid place-items-center">
            <img src="/assets/profileicons/user.svg" alt="Full name" className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-muted">Full name</div>
            <div className="text-sm font-semibold">{"Abdullah Ghatasheh"}</div>
          </div>
          <button className="text-sm text-brand-600 font-medium">Edit</button>
        </div>

        <div className="flex items-center gap-3 border-b border-line dark:border-white/10 bg-white dark:bg-transparent p-4">
          <div className="h-9 w-9 rounded-md bg-emerald-100 grid place-items-center">
            <img src="/assets/profileicons/phone.svg" alt="Mobile" className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-muted">Mobile</div>
            <div className="text-sm font-semibold">+962 79 890 50 14</div>
          </div>
          <button className="text-sm text-brand-600 font-medium">Edit</button>
        </div>

        <div className="flex items-center gap-3 border-b border-line dark:border-white/10 bg-white dark:bg-transparent p-4">
          <div className="h-9 w-9 rounded-md bg-emerald-50 grid place-items-center">
            <img src="/assets/profileicons/email.svg" alt="Email" className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-muted">Email</div>
            <div className="text-sm font-semibold">abdgfx@gmail.com</div>
          </div>
          <button className="text-sm text-brand-600 font-medium">Edit</button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/change-password")}
          className="flex items-center gap-3 w-full text-justify border-line dark:border-white/10 bg-white dark:bg-transparent p-4"
        >
          <div className="h-9 w-9 rounded-md bg-red-50 grid place-items-center">
            <img src="/assets/profileicons/lock.svg" alt="Change password" className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Change password</div>
          </div>
          <img src="/assets/icons/chevron-right.svg" alt="Open" className="h-4 w-4 text-muted" />
        </button>
        
        <div className="flex items-center justify-between gap-3 bg-white dark:bg-transparent p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-purple-100 dark:bg-white/50 grid place-items-center">
              <img src="/assets/profileicons/moon.svg" alt="Theme" className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs text-muted">Dark mode</div>
              <div className="text-sm font-semibold">{local === "dark" ? "On" : "Off"}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${local === "dark" ? "bg-[#5B35D5]" : "bg-gray-200"}`}
          >
            <span className={`h-4 w-4 transform rounded-full bg-white shadow transition-transform ${local === "dark" ? "translate-x-5" : "translate-x-1"}`} />
          </button>
        </div>
      </div>

      <div className="flex-1" />
    </div>
  );
}
