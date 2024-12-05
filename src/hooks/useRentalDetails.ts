import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { AllRentalDetail, RentalAccountResponse, RentalDetailResponse } from 'types';

// 추후 api 로직 분리
const fetchRentalDetails = (id: string) => {
  return axios.get<RentalDetailResponse>(`/api/v1/rents/${id}`);
};

const fetchDepositAccount = (id: string) => {
  return axios.get<RentalAccountResponse>(`/api/v1/rents/${id}/deposit-account`);
};

export const useRentalDetails = (id: string) => {
  // 로그인 여부 (추후 수정)
  const isLoggedIn = true;

  const fetchDetails = async (): Promise<AllRentalDetail> => {
    const detailPromise = await fetchRentalDetails(id);
    const accountPromise = isLoggedIn ? fetchDepositAccount(id) : Promise.resolve(null);

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
