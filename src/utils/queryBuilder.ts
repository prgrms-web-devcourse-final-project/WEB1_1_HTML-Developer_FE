// utils/filterQueryBuilder.ts 혹은 utils/queryBuilder.ts
import { DATE_SORT } from 'constants/filterTypes';
import type { Filters, DateSort, PageParam } from 'types';

const isDateSortKey = (value: string): value is DateSort => {
  return Object.prototype.hasOwnProperty.call(DATE_SORT, value);
};

export const buildBaseFilterQuery = (filters: Filters): string => {
  return Object.entries(filters)
    .filter(([, { value }]) => value !== '지역' && value !== '전체')
    .map(([key, { value }]) => {
      if (key === 'sort' && isDateSortKey(value)) {
        return `sort=${encodeURIComponent(DATE_SORT[value])}`;
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join('&');
};

export const buildPaginatedFilterQuery = (filters: Filters, pageParam: PageParam): string => {
  const filterQuery = buildBaseFilterQuery(filters);
  const { lastId, lastEndDate } = pageParam;

  const pageQueries: string[] = [];

  if (lastId) {
    pageQueries.push(`lastId=${lastId}`);
  }

  if (filterQuery.includes('CLOSING') && lastEndDate) {
    pageQueries.push(`lastEndDate=${lastEndDate}`);
  }

  return pageQueries.length > 0 ? `${filterQuery}&${pageQueries.join('&')}` : filterQuery;
};
