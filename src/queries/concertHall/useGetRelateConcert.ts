import { useQuery } from '@tanstack/react-query';

import { requestGetRelateConcerts } from 'api';
import type { RelateConcert } from 'types';

export const useGetRelateConcert = (hallCode: string) => {
  const fetchRelateConcerts = async () => {
    const { data } = await requestGetRelateConcerts(`hallCode=${hallCode}&pageSize=10`);
    return data.result;
  };

  return useQuery<RelateConcert[]>({
    queryKey: ['relateConcerts', hallCode],
    queryFn: fetchRelateConcerts,
    staleTime: 5 * 60 * 1000,
  });
};
