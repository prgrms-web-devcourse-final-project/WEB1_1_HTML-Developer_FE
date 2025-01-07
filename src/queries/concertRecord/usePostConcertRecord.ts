import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestPostConcertRecord } from 'api';
import type { ConcertRecordForm } from 'types';
import { getYearAndMonth } from 'utils';

const createFormData = async (recordFormData: ConcertRecordForm) => {
  const formData = new FormData();
  const { images, ...rest } = recordFormData;

  images.forEach((file) => {
    formData.append('images', file);
  });

  formData.append('request', JSON.stringify(rest));

  return await requestPostConcertRecord(formData);
};

export const usePostConcertRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFormData,
    onSuccess: async (_, variables: ConcertRecordForm) => {
      const { year, month } = getYearAndMonth(variables.date);
      await queryClient.invalidateQueries({ queryKey: ['recordList', year, month] });
    },
    onError: (err) => {
      console.log('공연 기록 생성 오류: ', err);
    },
  });
};
