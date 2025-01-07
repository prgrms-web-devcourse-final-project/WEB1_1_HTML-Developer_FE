import { useQuery } from '@tanstack/react-query';

import { requestGetConcertRecordDetails } from 'api';
import type { ConcertRecordDetail } from 'types';

export const useGetConcertRecordDetail = (id: string) => {
  const fetchRecordDetails = async () => {
    const { result } = await requestGetConcertRecordDetails(id);
    return result;
  };

  return useQuery<ConcertRecordDetail>({
    queryKey: ['recordDetails', id],
    queryFn: fetchRecordDetails,
    enabled: !!id,
  });
};
