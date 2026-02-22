import type { PropsWithChildren } from "react";

export function IllustrationPlaceholder({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto mt-6 flex h-[210px] w-[260px] items-center justify-center rounded-2xl bg-brand-50">
      <div className="flex h-[170px] w-[210px] items-center justify-center rounded-xl border border-brand-100 bg-white/50 text-xs text-muted">
        {children ?? "Illustration"}
      </div>
    </div>
  );
}

export function IconPlaceholder({ label = "icon" }: { label?: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-[10px] text-muted">
      {label}
    </div>
  );
}
