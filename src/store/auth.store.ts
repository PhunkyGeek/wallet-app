import { create } from "zustand";

type AuthState = {
  isAuthed: boolean;
  user: { name: string } | null;
  login: (name?: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthed: false,
  user: null,
  login: async (name = "Abdullah") => {
    await new Promise((r) => setTimeout(r, 900)); // mock auth latency
    set({ isAuthed: true, user: { name } });
  },
  logout: () => set({ isAuthed: false, user: null })
}));
