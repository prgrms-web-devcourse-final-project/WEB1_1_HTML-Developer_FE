import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestPostRentalForm } from 'api';
import { useFilterStore } from 'stores';
import type { RentalFormData } from 'types';

const postFormData = async (rentalFormData: RentalFormData) => {
  const formData = new FormData();
  const { imageUrl, ...rentRegisterRequest } = rentalFormData;

  // Base64 -> Blob
  const byteCharacters = atob(imageUrl.split(',')[1]);
  const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: imageUrl.match(/data:(.*?);base64/)?.[1] || 'application/octet-stream',
  });

  formData.append('image', blob, 'uploaded_image.png');
  formData.append('rentRegisterRequest', JSON.stringify(rentRegisterRequest));

  return await requestPostRentalForm(formData);
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
