import type { PropsWithChildren } from "react";
import { BottomNav } from "@/components/ui/BottomNav";
import { useAuthStore } from "@/store/auth.store";

export function AppFrame({ children }: PropsWithChildren) {
  // Keeps the mobile-app feel on large screens while still responsive.
  // The BottomNav is rendered inside the frame so it stays mounted across route changes.
  const isAuthed = useAuthStore((s) => s.isAuthed);

  return (
    <div className="min-h-dvh w-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[420px] md:max-w-[760px] xl:max-w-[1040px]">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-card">
          {/* content area - pages render here */}
          {children}

          {/* persistent bottom navigation inside the frame (only for signed-in users) */}
          {useAuthStore.getState().isAuthed ? (
            <div className="absolute left-0 right-0 bottom-0">
              <BottomNav />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
