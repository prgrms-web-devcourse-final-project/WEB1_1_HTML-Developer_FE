import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestPatchConcertRecord } from 'api';
import type { ConcertRecordUpdate } from 'types';
import { getYearAndMonth } from 'utils';

const updateFormData = async (recordFormData: ConcertRecordUpdate) => {
  const formData = new FormData();
  const { images, ...rest } = recordFormData;

  images.forEach((file) => {
    formData.append('images', file);
  });

  formData.append('request', JSON.stringify(rest));

  return await requestPatchConcertRecord(formData);
};

export const usePatchConcertRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFormData,
    onSuccess: async (_, variables: ConcertRecordUpdate) => {
      const { year, month } = getYearAndMonth(variables.date);
      await queryClient.invalidateQueries({ queryKey: ['recordList', year, month] });
    },
    onError: (err) => {
      console.log('공연 기록 수정 오류: ', err);
    },
  });
};
