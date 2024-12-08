import { useQuery } from '@tanstack/react-query';

import { requestGetDepositAccount, requestGetRentalDetails } from 'api';
import type { AllRentalDetail } from 'types';

export const useGetRentalDetails = (id: string) => {
  // 로그인 여부 (추후 수정)
  const isLoggedIn = false;

  const fetchDetails = async (): Promise<AllRentalDetail> => {
    const detailPromise = await requestGetRentalDetails(id);
    const accountPromise = isLoggedIn ? requestGetDepositAccount(id) : Promise.resolve(null);

    const [detailResponse, accountResponse] = await Promise.all([detailPromise, accountPromise]);
    const rentalDetails = detailResponse.data.result;
    const depositAccount = accountResponse?.data.result.depositAccount ?? null;

    return { ...rentalDetails, depositAccount };
  };

  return useQuery<AllRentalDetail>({
    queryKey: ['rentalDetail', id],
    queryFn: fetchDetails,
    enabled: !!id,
  });
};
