import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  if (!isAuthed) return <Navigate to="/" replace />;
  return <>{children}</>;
}
