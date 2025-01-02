import { endPoint } from 'constants/endPoint';
import { authStore } from 'stores';
import type { DepositFormResponse, PageParam } from 'types';
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
  return await publicAxios.get<RentalListResponse>(`${endPoint.GET_RENT_LIST}?${query}`);
};

export const requestGetRentalDetails = async (id: string) => {
  const token = authStore.getState().token;
  if (token) tokenAxios.defaults.headers.Authorization = `Bearer ${token}`;
  return await tokenAxios.get<RentalDetailResponse>(endPoint.GET_RENT_DETAIL(id));
};

export const requestGetDepositAccount = async (id: string) => {
  return await tokenAxios.get<RentalAccountResponse>(endPoint.GET_DEPOSIT_ACCOUNT(id));
};

export const requestPostDepositForm = async (formData: string) => {
  return await tokenAxios.post<DepositFormResponse>(`${endPoint.APPLY_RENT_FORM}`, formData);
};
