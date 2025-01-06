import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestPostConcertRecord } from 'api';
import type { ConcertRecord } from 'types';

const postFormData = async (recordFormData: ConcertRecord) => {
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
    mutationFn: postFormData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['recordList'] });
    },
    onError: (err) => {
      console.log('폼 전송 오류: ', err);
    },
  });
};
