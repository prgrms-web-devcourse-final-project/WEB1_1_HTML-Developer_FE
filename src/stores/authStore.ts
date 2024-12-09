import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  token: string;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  setIsLoggedIn: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: '',
      isLoggedIn: false,
      setToken: (token) => set({ token }),
      setIsLoggedIn: () => set({ isLoggedIn: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
