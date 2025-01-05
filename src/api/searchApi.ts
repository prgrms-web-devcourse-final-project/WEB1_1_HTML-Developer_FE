import { endPoint } from 'constants/endPoint';
import type { SearchArtistResponse, SearchConcertResponse } from 'types';
import { publicAxios } from 'utils';

// 공연 검색 - today 이후
export const requestGetSearchConcert = async (query: string) => {
  const { data } = await publicAxios.get<SearchConcertResponse>(
    `${endPoint.GET_CONCERT_SEARCH_LIST}?${query}`
  );
  return data;
};

// 공연 검색 - 전체 기간(과거 + 미래)
export const requestGetSearchAllConcert = async (query: string) => {
  const { data } = await publicAxios.get<SearchConcertResponse>(
    `${endPoint.GET_CONCERT_SEARCH_ALL}?${query}`
  );
  return data;
};

// 아티스트 검색
export const requestGetSearchArtist = async (query: string) => {
  const { data } = await publicAxios.get<SearchArtistResponse>(
    `${endPoint.SEARCH_ARTISTS}?query=${query}`
  );
  return data;
};
