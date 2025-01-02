import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestPostDepositForm } from 'api';
import type { DepositFormData } from 'types';

const postFormData = async (id: string, depositFormData: DepositFormData) => {
  return await requestPostDepositForm(JSON.stringify(depositFormData));
};

export const usePostDepositForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, depositFormData }: { id: string; depositFormData: DepositFormData }) =>
      postFormData(id, depositFormData),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({ queryKey: ['rentalDetail', id] });
    },
    onError: (err) => {
      console.log('폼 전송 오류: ', err);
    },
  });
};
