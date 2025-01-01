import { useQuery } from '@tanstack/react-query';

import { requestGetDepositAccount, requestGetRentalDetails } from 'api';
import { useAuthStore } from 'stores';
import type { AllRentalDetail } from 'types';

const fetchDetails = async (id: string, isLoggedIn: boolean) => {
  const detailPromise = await requestGetRentalDetails(id);
  const accountPromise = isLoggedIn ? requestGetDepositAccount(id) : Promise.resolve(null);

  const [detailResponse, accountResponse] = await Promise.all([detailPromise, accountPromise]);
  const rentalDetails = detailResponse.data.result;
  const depositAccount = accountResponse?.data.result.depositAccount ?? null;

  return { ...rentalDetails, depositAccount };
};

export const useGetRentalDetails = (id: string) => {
  const { isLoggedIn } = useAuthStore(['isLoggedIn']);
  const fetchDetailsWithAuth = () => fetchDetails(id, isLoggedIn);

  return useQuery<AllRentalDetail>({
    queryKey: ['rentalDetail', id],
    queryFn: fetchDetailsWithAuth,
    enabled: !!id,
  });
};
