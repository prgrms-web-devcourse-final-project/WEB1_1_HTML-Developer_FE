import { useQuery } from '@tanstack/react-query';

import { requestGetHallDetails } from 'api';
import type { concertHallDetail } from 'types';

export const useGetConcertHallDetail = (id: string) => {
  const fetchHallDetails = async () => {
    const { data } = await requestGetHallDetails(id);
    return data.result;
  };

  return useQuery<concertHallDetail>({
    queryKey: ['hallDetails', id],
    queryFn: fetchHallDetails,
    enabled: !!id,
  });
};
