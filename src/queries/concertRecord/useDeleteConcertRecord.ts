import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestDeleteConcertRecord } from 'api';
import { getYearAndMonth } from 'utils';

const deleteRecord = async ({ id }: { id: string }) => {
  return await requestDeleteConcertRecord(id);
};

export const useDeleteConcertRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecord,
    onSuccess: async (_, variables: { id: string; date: string }) => {
      const { year, month } = getYearAndMonth(variables.date);
      await queryClient.invalidateQueries({ queryKey: ['recordList', year, month] });
    },
    onError: (err) => {
      console.log('공연 기록 삭제 오류: ', err);
    },
  });
};
