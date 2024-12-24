import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

type AuthState = {
  isLoggedIn: boolean;
};

type AuthActions = {
  setIsLoggedIn: () => void;
};

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  isLoggedIn: false,
};

const authStore = createWithEqualityFn(
  immer<AuthStore>((set) => ({
    ...initialState,
    setIsLoggedIn: () => {
      set((state) => {
        state.isLoggedIn = true;
      });
    },
  }))
);

export const useAuthStore: StoreWithShallow<AuthStore> = (keys) =>
  useStoreWithShallow(authStore, keys);
