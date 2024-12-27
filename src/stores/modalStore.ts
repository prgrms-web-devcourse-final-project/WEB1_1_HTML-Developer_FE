import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

import type { ModalType, DialogType, BottomSheetType, BaseModalData } from 'types';

type ModalState = {
  dialog: { [K in DialogType]?: BaseModalData };
  bottomSheet: { [K in BottomSheetType]?: BaseModalData };
};

type ModalActions = {
  openModal: <T extends ModalType, K extends keyof ModalState[T]>(
    type: T,
    key: K,
    content: React.ReactNode
  ) => void;
  closeModal: <T extends keyof ModalState>(type: T, key: keyof ModalState[T]) => void;
  closeAllModal: () => void;
};

type ModalStore = ModalState & ModalActions;

const initialState: ModalState = {
  dialog: {},
  bottomSheet: {},
};

const modalStore = createWithEqualityFn(
  immer<ModalStore>((set) => ({
    ...initialState,
    openModal: (type, key, content) => {
      document.body.style.overflow = 'hidden';
      set((state) => {
        (state[type][key] as BaseModalData) = {
          content,
        };
      });
    },
    closeModal: (type, key) => {
      document.body.style.overflow = 'unset';
      set((state) => {
        delete state[type][key];
      });
    },
    closeAllModal: () => set(initialState),
  }))
);

export const useModalStore: StoreWithShallow<ModalStore> = (keys) =>
  useStoreWithShallow(modalStore, keys);
