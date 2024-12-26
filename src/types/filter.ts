import type { REGIONS, CONCERT_SORT, DATE_SORT, DATE_SORT_OPTIONS } from 'constants/filterTypes';

export type Region = (typeof REGIONS)[number];
export type ConcertSort = (typeof CONCERT_SORT)[number];
export type DateSort = keyof typeof DATE_SORT;

export type FilterType = 'region' | 'sort';
export type FilterOptionsMap = {
  region: (typeof REGIONS)[number];
  sort: (typeof DATE_SORT_OPTIONS)[number];
};

interface FilterConfig<T extends FilterType> {
  name: string;
  options: T extends 'region' ? typeof REGIONS : typeof DATE_SORT_OPTIONS;
}

export type FilterNameConfig = {
  [K in FilterType]: FilterConfig<K>;
};

type Filter = {
  value: string;
  isActive: boolean;
};

export type Filters = {
  region: Filter;
  sort: Filter;
};

export interface PageParam {
  lastId: number | null;
  lastEndDate: string | null;
}
