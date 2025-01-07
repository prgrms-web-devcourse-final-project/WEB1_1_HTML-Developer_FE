import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

interface RecordData {
  id: string | null;
  date: string | null;
}

interface concertRecordStore {
  recordData: RecordData;
  updateRecordData: (data: RecordData) => void;
  resetRecordData: () => void;
}

const initValues = {
  id: null,
  date: null,
};

export const concertRecordStore = createWithEqualityFn(
  immer<concertRecordStore>((set) => ({
    recordData: initValues,
    updateRecordData: (value) => {
      set((state) => {
        state.recordData = value;
      });
    },
    resetRecordData: () => {
      set((state) => {
        state.recordData = initValues;
      });
    },
  }))
);

export const useConcertRecordStore: StoreWithShallow<concertRecordStore> = (keys) =>
  useStoreWithShallow(concertRecordStore, keys);
