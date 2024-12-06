import { useQuery } from '@tanstack/react-query';

import { requestGetRentalList } from 'api';
import type { RentalList } from 'types';

export const useRentalList = () => {
  const fetchFilteredList = async (): Promise<RentalList[]> => {
    const query = ``; // query 가져오기 수정
    return await requestGetRentalList({ query });
  };

  return useQuery<RentalList[]>({
    queryKey: ['rentalList'],
    queryFn: fetchFilteredList,
  });
};
