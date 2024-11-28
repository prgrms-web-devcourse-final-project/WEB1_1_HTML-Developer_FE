import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

type BottomSheetState = {
  isOpen: boolean;
};

type BottomSheetActions = {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
};

type BottomSheetStore = BottomSheetState & BottomSheetActions;

const initialBottomSheetState: BottomSheetState = {
  isOpen: false,
};

const bottomSheetStore = createWithEqualityFn<BottomSheetStore>((set) => ({
  ...initialBottomSheetState,
  openBottomSheet: () => {
    document.body.style.overflow = 'hidden';

    set({ isOpen: true });
  },
  closeBottomSheet: () => {
    document.body.style.overflow = '';
    set({ ...initialBottomSheetState });
  },
}));

export const useBottomSheetStore: StoreWithShallow<BottomSheetStore> = (keys) =>
  useStoreWithShallow(bottomSheetStore, keys);
