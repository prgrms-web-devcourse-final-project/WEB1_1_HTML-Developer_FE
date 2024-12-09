import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

import type { RefundType } from 'types';

export const BOARDING_TYPE = {
  ROUND: '왕복',
  UP: '상행',
  DOWN: '하행',
} as const;

export type BoardingType = keyof typeof BOARDING_TYPE;

export interface DepositFormValues {
  rentId: number | null;
  depositorName: string;
  depositorTime: string;
  phone: string;
  passengerNum: number;
  boardingDate: string;
  boardingType: BoardingType | null;
  refundType: RefundType | null;
  refundAccount: string;
}

type DepositFormStore = {
  data: DepositFormValues;
  updateFormValue: <K extends keyof DepositFormValues>(
    formKey: K,
    value: DepositFormValues[K]
  ) => void;
};

const initFormData: DepositFormValues = {
  rentId: null,
  depositorName: '',
  depositorTime: '',
  phone: '',
  passengerNum: 1,
  boardingType: null,
  refundType: null,
  refundAccount: '',
  boardingDate: '',
};

const DepositFormStore = createWithEqualityFn(
  immer<DepositFormStore>((set) => ({
    data: initFormData,
    updateFormValue: (formKey, value) =>
      set((state) => ({
        data: {
          ...state.data,
          [formKey]: value,
        },
      })),
  }))
);

export const useDepositFormStore: StoreWithShallow<DepositFormStore> = (keys) =>
  useStoreWithShallow(DepositFormStore, keys);
