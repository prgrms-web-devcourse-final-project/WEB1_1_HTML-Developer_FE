import { endPoint } from 'constants/endPoint';
import type { HallDetailResponse } from 'types';
import { publicAxios } from 'utils';

export const requestGetHallDetails = async (id: string) => {
  return await publicAxios.get<HallDetailResponse>(endPoint.GET_CONCERT_HALL(id));
};
