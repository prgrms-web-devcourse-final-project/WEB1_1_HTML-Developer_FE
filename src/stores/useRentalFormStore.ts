import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

import type { ConcertData } from 'types';

interface FormData {
  imageUrl: string;
  title: string;
  region: string;
  depositAccount: string;
  concertId: number;
  artistName: string;
}

interface RentalFormStore {
  concertData: ConcertData | null;
  formData: FormData;
  updateConcertData: (value: ConcertData) => void;
  updateFormData: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}

const initFormData: FormData = {
  imageUrl: '',
  title: '',
  region: '',
  depositAccount: '',
  concertId: 0,
  artistName: '',
};

const rentalFormStore = createWithEqualityFn(
  immer<RentalFormStore>((set) => ({
    concertData: null,
    formData: initFormData,
    updateConcertData: (value) => {
      set((state) => {
        state.concertData = value;
      });
    },
    updateFormData: (key, value) => {
      set((state) => {
        state.formData[key] = value;
      });
    },
  }))
);

export const useRentalFormStore: StoreWithShallow<RentalFormStore> = (keys) =>
  useStoreWithShallow(rentalFormStore, keys);
