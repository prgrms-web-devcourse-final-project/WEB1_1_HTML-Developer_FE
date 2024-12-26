import axios from 'axios';

import { endPoint } from 'constants/endPoint';
import { API_URL } from 'constants/url';
import type { PageParam } from 'types';
import type { RentalAccountResponse, RentalDetailResponse, RentalListResponse } from 'types';
import { publicAxios } from 'utils';

export const tokenTestAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

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
  return data.result;
};

export const requestGetRentalDetails = (id: string) => {
  return publicAxios.get<RentalDetailResponse>(endPoint.GET_RENT_DETAIL(id));
};

export const requestGetDepositAccount = (id: string) => {
  // 추후 수정
  return tokenTestAxios.get<RentalAccountResponse>(endPoint.GET_DEPOSIT_ACCOUNT(id));
};
