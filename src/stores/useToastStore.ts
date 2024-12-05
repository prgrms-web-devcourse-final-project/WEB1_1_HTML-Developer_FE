import { nanoid } from 'nanoid';
import type { ReactNode } from 'react';
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

type Toast = {
  id: string;
  content: string;
  icon?: ReactNode;
};

type ToastStore = {
  toasts: Toast[];
  activeContent: string | null;
  addToast: (content: string, icon?: ReactNode) => void;
};

const toastStore = createWithEqualityFn(
  immer<ToastStore>((set) => ({
    toasts: [],
    activeContent: null,
    addToast: (content: string, icon?: ReactNode) => {
      set((state) => {
        // 같은 내용이면 연속 활성화 차단
        if (state.activeContent === content) return;

        const id = nanoid();
        state.toasts = [{ id, content, icon }];
        state.activeContent = content;

        setTimeout(() => {
          set((state) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== id);
            if (state.activeContent === content) state.activeContent = null;
          });
        }, 2000);
      });
    },
  }))
);

export const useToastStore: StoreWithShallow<ToastStore> = (keys) =>
  useStoreWithShallow(toastStore, keys);
