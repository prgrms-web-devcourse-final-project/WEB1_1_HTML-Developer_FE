import { endPoint } from 'constants/endPoint';
import type { SearchConcertResponse } from 'types';
import { publicAxios } from 'utils';

// 공연 검색
export const requestGetSearchConcert = async (query: string) => {
  return (
    await publicAxios.get<SearchConcertResponse>(
      `${endPoint.GET_CONCERT_SEARCH_LIST}?query=${query}`
    )
  ).data.result;
};
