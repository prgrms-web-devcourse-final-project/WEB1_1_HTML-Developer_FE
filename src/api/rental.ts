import type { ApiResponse } from './api';

import { endPoint } from 'constants/endPoint';
import type { RentalList } from 'types';
import { publicAxios } from 'utils';

export interface RequestGetRentalList {
  query?: string;
}

export const requestGetRentalList = async ({ query }: RequestGetRentalList) => {
  return (await publicAxios.get<ApiResponse<RentalList[]>>(`${endPoint.GET_RENT_LIST}?${query}`))
    .data.result;
};
