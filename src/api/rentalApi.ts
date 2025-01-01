import { endPoint } from 'constants/endPoint';
import type { PageParam } from 'types';
import type { RentalAccountResponse, RentalDetailResponse, RentalListResponse } from 'types';
import { publicAxios, tokenAxios } from 'utils';

export const createRentalQuery = (filterQuery: string, pageParam: PageParam) => {
  const { lastId, lastEndDate } = pageParam;
  let pageQuery = lastId ? `lastId=${lastId}` : '';

  if (filterQuery.includes('CLOSING') && lastEndDate) {
    pageQuery += `&lastEndDate=${lastEndDate}`;
  }

  return pageQuery ? `${filterQuery}&${pageQuery}` : filterQuery;
};

export const requestGetRentalList = async (query: string) => {
  const { data } = await publicAxios.get<RentalListResponse>(`${endPoint.GET_RENT_LIST}?${query}`);
  return data;
};

export const requestGetRentalDetails = (id: string) => {
  return publicAxios.get<RentalDetailResponse>(endPoint.GET_RENT_DETAIL(id));
};

export const requestGetDepositAccount = (id: string) => {
  return tokenAxios.get<RentalAccountResponse>(endPoint.GET_DEPOSIT_ACCOUNT(id));
};
