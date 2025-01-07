import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetSearchAllConcert, requestGetSearchConcert } from 'api';
import type { SearchConcert, SearchAfter } from 'types';

const generateSearchQuery = (searches: string | null, searchAfter: SearchAfter | null): string => {
  if (!searches) return '';
  return searchAfter
    ? `query=${searches}&searchAfter1=${searchAfter[0]}&searchAfter2=${searchAfter[1]}`
    : `query=${searches}`;
};

export const useGetSearchConcert = (searches: string | null, isPastSearch: boolean) => {
  const fetchSearchResultList = async (searchAfter: SearchAfter): Promise<SearchConcert> => {
    if (!searches) return { concertThumbnails: [], searchAfter: null };

    const query = generateSearchQuery(searches, searchAfter);

    const requestApi = isPastSearch ? requestGetSearchAllConcert : requestGetSearchConcert;
    const { result } = await requestApi(query);

    return result;
  };

  return useInfiniteQuery<SearchConcert>({
    queryKey: ['searchConcert', searches, isPastSearch],
    queryFn: ({ pageParam }) => fetchSearchResultList(pageParam as SearchAfter),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.searchAfter,
    enabled: !!searches?.trim(),
    retry: false,
  });
};
