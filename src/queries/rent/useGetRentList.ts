import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetRentalList } from 'api';
import { useFilterStore } from 'stores';
import type { RentalList, PageParam } from 'types';
import { buildPaginatedFilterQuery } from 'utils';

export const useGetRentalList = () => {
  const { rentalFilters } = useFilterStore(['rentalFilters']);

  const fetchFilteredList = async (pageParam: PageParam) => {
    const query = buildPaginatedFilterQuery(rentalFilters, pageParam);
    const response = await requestGetRentalList(query);
    return response.data.result;
  };

  return useInfiniteQuery<RentalList[]>({
    queryKey: ['rentalList', rentalFilters],
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
