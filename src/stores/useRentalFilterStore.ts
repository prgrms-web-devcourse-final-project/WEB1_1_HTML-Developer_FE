import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

import type { DateSort } from 'constants/filterTypes';
import { DATE_SORT } from 'constants/filterTypes';
import type { RentalFilterValue } from 'types';

type Filters = {
  region: { isActive: boolean; value: string };
  sort: { isActive: boolean; value: string };
};

interface RentalFilterStore {
  filters: Filters;
  updateFilterActive: (filterKey: keyof Filters, value: RentalFilterValue) => void;
  getFilterQuery: () => string;
}

const initFilters: Filters = {
  region: { value: '지역', isActive: false },
  sort: { value: '최신순', isActive: false },
};

const rentalFilterStore = createWithEqualityFn(
  immer<RentalFilterStore>((set, get) => ({
    filters: initFilters,
    updateFilterActive: (filterKey, value) => {
      set((state) => {
        state.filters[filterKey] = { value, isActive: true };
      });
    },
    getFilterQuery: () => {
      const { filters } = get();
      return Object.entries(filters)
        .filter(([, { value }]) => value !== '지역' && value !== '전체')
        .map(([key, { value }]) => {
          const queryValue = key === 'sort' ? DATE_SORT[value as DateSort] : value;
          return `${key}=${encodeURIComponent(queryValue)}`;
        })
        .join('&');
    },
  }))
);

export const useRentalFilterStore: StoreWithShallow<RentalFilterStore> = (keys) =>
  useStoreWithShallow(rentalFilterStore, keys);
