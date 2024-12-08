import { useInfiniteQuery } from '@tanstack/react-query';

import { createRentalQuery, requestGetRentalList } from 'api';
import { useRentalFilterStore } from 'stores/useRentalFilterStore';
import type { RentalList } from 'types';

export interface PageParam {
  lastId: number | null;
  lastEndDate: string | null;
}

export const useRentalList = () => {
  const { filters, getFilterQuery } = useRentalFilterStore(['filters', 'getFilterQuery']);

  const fetchFilteredList = async (pageParam: PageParam): Promise<RentalList[]> => {
    const filterQuery = getFilterQuery();
    const query = createRentalQuery(filterQuery, pageParam);

    return await requestGetRentalList(query);
  };

  return useInfiniteQuery<RentalList[]>({
    queryKey: ['rentalList', filters],
    queryFn: ({ pageParam }) => {
      const param = pageParam as PageParam;
      return fetchFilteredList(param);
    },
    initialPageParam: { lastId: null, lastEndDate: null },
    getNextPageParam: (lastPage) => {
      const lastData = lastPage[lastPage.length - 1];
      return lastPage.length > 0
        ? { lastId: lastData.rentId, lastEndDate: lastData.endDate }
        : undefined;
    },
  });
};
