import { endPoint } from 'constants/endPoint';
import { tokenAxios } from 'utils';

export const requestPostRentalForm = async (formData: FormData) => {
  return await tokenAxios.post(`${endPoint.CREATE_RENT_FORM}`, formData);
};
