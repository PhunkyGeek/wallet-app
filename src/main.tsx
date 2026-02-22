import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/routes";
import "@/styles/globals.css";
import { useThemeStore, applyTheme } from "@/store/theme.store";

function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    applyTheme(theme);
    // If theme is 'system', listen for OS color-scheme changes and re-apply
    let m: MediaQueryList | null = null;
    const handler = () => applyTheme(theme);
    if (theme === "system" && typeof window !== "undefined" && window.matchMedia) {
      m = window.matchMedia("(prefers-color-scheme: dark)");
      if (m.addEventListener) m.addEventListener("change", handler);
      else m.addListener(handler as any);
    }
    return () => {
      if (m) {
        if (m.removeEventListener) m.removeEventListener("change", handler);
        else m.removeListener(handler as any);
      }
    };
  }, [theme]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
