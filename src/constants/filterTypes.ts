import type { RentalFilterType } from 'types';

export const REGIONS = [
  '전체',
  '서울',
  '경기',
  '인천',
  '강원',
  '세종',
  '천안',
  '청주',
  '대전',
  '대구',
  '경북',
  '부산',
  '울산',
  '마산',
  '창원',
  '경남',
  '광주',
  '전북',
  '전주',
  '전남',
] as const;

export const CONCERT_SORT = ['최근 공연순', '인기순'] as const;
export const DATE_SORT = {
  최신순: 'LATEST',
  오래된순: 'OLDEST',
  마감순: 'CLOSING',
} as const;

export type Region = (typeof REGIONS)[number];
export type ConcertSort = (typeof CONCERT_SORT)[number];
export type DateSort = keyof typeof DATE_SORT;

export const DATE_SORT_ARRAY = Object.keys(DATE_SORT) as (keyof typeof DATE_SORT)[];
export const RENTAL_FILTER: RentalFilterType[] = ['region', 'sort'];
