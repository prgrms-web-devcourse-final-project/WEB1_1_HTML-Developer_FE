import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string | null) => void;
  setIsLoggedIn: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      setToken: (token) => set({ token }),
      setIsLoggedIn: () => set({ isLoggedIn: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
