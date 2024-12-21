import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { requestGetSearchConcert } from 'api';
import type { ConcertData } from 'types';

export const useGetSearchConcert = (
  searches: string | null,
  options?: UseQueryOptions<ConcertData[], Error>
) => {
  const fetchConcert = async (): Promise<ConcertData[]> => {
    if (!searches) return [];

    const result = await requestGetSearchConcert(searches);
    return result.concertThumbnails;
  };

  return useQuery<ConcertData[], Error>({
    queryKey: ['formSearchConcert', searches],
    queryFn: fetchConcert,
    enabled: !!searches?.trim(),
    retry: false, // 검색 결과가 없을 경우 재시도 X
    ...options,
  });
};
