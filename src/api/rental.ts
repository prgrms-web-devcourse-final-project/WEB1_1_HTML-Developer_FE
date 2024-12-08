import { endPoint } from 'constants/endPoint';
import type { PageParam } from 'queries/rent/useRentList';
import type { RentalListResponse } from 'types';
import { publicAxios } from 'utils';

export const createRentalQuery = (filterQuery: string, pageParam: PageParam) => {
  const { lastId, lastEndDate } = pageParam;
  let pageQuery = lastId ? `lastId=${lastId}` : '';

  if (filterQuery.includes('CLOSING') && lastEndDate) {
    pageQuery += `&lastEndDate=${lastEndDate}`;
  }

  return pageQuery ? `${filterQuery}&${pageQuery}` : filterQuery;
};

export const requestGetRentalList = async (query: string) => {
  return (await publicAxios.get<RentalListResponse>(`${endPoint.GET_RENT_LIST}?${query}`)).data
    .result;
};
