import create from "zustand";

type Theme = "light" | "dark" | "system";

type ThemeState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const LS_KEY = "app_theme";

export const useThemeStore = create<ThemeState>((set) => ({
  theme: ((): Theme => {
    try {
      const v = localStorage.getItem(LS_KEY);
      if (v === "light" || v === "dark" || v === "system") return v;
    } catch (e) {
      // ignore
    }
    return "system";
  })(),
  setTheme: (t: Theme) => {
    try {
      localStorage.setItem(LS_KEY, t);
    } catch (e) {
      // ignore
    }
    set({ theme: t });
  },
}));

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);
  if (isDark) root.classList.add("dark");
  else root.classList.remove("dark");
}
