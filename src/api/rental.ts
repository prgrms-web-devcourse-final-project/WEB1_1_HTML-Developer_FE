import { endPoint } from 'constants/endPoint';
import type { RentalListResponse } from 'types';
import { publicAxios } from 'utils';

export interface RequestGetRentalList {
  query?: string;
}

export const requestGetRentalList = async ({ query }: RequestGetRentalList) => {
  return (await publicAxios.get<RentalListResponse>(`${endPoint.GET_RENT_LIST}?${query}`)).data
    .result;
};
