import type { PropsWithChildren } from "react";
import { BottomNav } from "@/components/ui/BottomNav";
import { useAuthStore } from "@/store/auth.store";
import { useLocation } from "react-router-dom";

// Fixed heights
const NAV_HEIGHT = 72; // px, adjust if your BottomNav height differs

export default function AppFrame({ children }: PropsWithChildren) {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const { pathname } = useLocation();

  // pages that should hide the persistent bottom nav
  const HIDE_NAV_PATHS = ["/bills/success", "/transfer/failure"];
  const hideNav = HIDE_NAV_PATHS.some((p) => pathname.startsWith(p));

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-bg">
      <div className="phone-frame w-full" style={{ minHeight: '100dvh', display: 'flex', justifyContent: 'center' }}>
  {/* centered mobile container (responsive width, fixed height) */}
  <div className="w-full max-w-[420px] md:max-w-[760px] xl:max-w-[1040px] h-[100dvh] relative rounded-3xl bg-white dark:bg-[#0B0F1A] shadow-card overflow-hidden">
          {/* scrolling content area */}
          <div
            className="app-scroll"
            style={{
              height: '100%',
              paddingBottom: isAuthed ? `${NAV_HEIGHT + 20}px` : 20, // leave space for sticky nav
            }}
          >
            {children}
          </div>

          {/* persistent bottom navigation: fixed so content scrolls behind it */}
          {isAuthed && !hideNav ? (
            <div className="fixed left-1/2 bottom-0 transform -translate-x-1/2 w-full px-4 pointer-events-auto z-50">
              <div className="w-full max-w-[420px] md:max-w-[760px] xl:max-w-[1040px] mx-auto rounded-b-3xl overflow-hidden bg-white dark:bg-[#0B0F1A] shadow-card">
                <BottomNav />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
