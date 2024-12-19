import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
};

type AuthActions = {
  setToken: (token: string | null) => void;
  setIsLoggedIn: () => void;
};

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
};

const authStore = createWithEqualityFn(
  immer<AuthStore>((set) => ({
    ...initialState,
    setToken: (token) => {
      set((state) => {
        state.token = token;
      });
    },
    setIsLoggedIn: () => {
      set((state) => {
        state.isLoggedIn = true;
      });
    },
  }))
);

export const useAuthStore: StoreWithShallow<AuthStore> = (keys) =>
  useStoreWithShallow(authStore, keys);
