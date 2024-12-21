import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { requestGetSearchArtist } from 'api';
import type { SearchArtist } from 'types';

export const useGetSearchArtist = (
  searches: string | null,
  options?: UseQueryOptions<SearchArtist[], Error>
) => {
  const fetchArtist = async (): Promise<SearchArtist[]> => {
    if (!searches) return [];

    return await requestGetSearchArtist(searches);
  };

  return useQuery<SearchArtist[], Error>({
    queryKey: ['formSearchArtist', searches],
    queryFn: fetchArtist,
    enabled: !!searches?.trim(),
    retry: false, // 검색 결과가 없을 경우 재시도 X
    ...options,
  });
};
