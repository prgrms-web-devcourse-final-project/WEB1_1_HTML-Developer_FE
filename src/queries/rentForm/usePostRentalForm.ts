import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestPostRentalForm } from 'api';
import { useFilterStore } from 'stores';
import type { RentalFormData } from 'types';

// 추후 formData 형식으로 변경
const postFormData = async (rentalFormData: RentalFormData) => {
  //const formData = new FormData();

  // Object.keys(rentalFormData).forEach((key) => {
  //   const value = rentalFormData[key as keyof RentalFormData];

  //   if (value === null || value === undefined) return;

  //   if (Array.isArray(value)) {
  //     formData.append(key, JSON.stringify(value));
  //   } else {
  //     formData.append(key, value.toString());
  //   }
  // });

  const newData = { ...rentalFormData };
  newData.imageUrl = 'https://ticketimage.interpark.com/Play/image/large/24/24015427_p.gif';

  // return await requestPostRentalForm(formData);
  return await requestPostRentalForm(JSON.stringify(newData));
};

export const usePostRentalForm = () => {
  const queryClient = useQueryClient();
  const { rentalFilters } = useFilterStore(['rentalFilters']);

  return useMutation({
    mutationFn: postFormData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['rentalList', rentalFilters] });
    },
    onError: (err) => {
      console.log('폼 전송 오류: ', err);
    },
  });
};
