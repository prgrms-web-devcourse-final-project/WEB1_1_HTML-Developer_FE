import { endPoint } from 'constants/endPoint';
import { tokenAxios } from 'utils';

export const requestPostConcertRecord = async (formData: FormData) => {
  return await tokenAxios.post(`${endPoint.CREATE_CONCERT_RECORD}`, formData);
};
