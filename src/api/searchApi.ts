import { endPoint } from 'constants/endPoint';
import type { SearchArtistResponse, SearchConcertResponse } from 'types';
import { publicAxios } from 'utils';

// 공연 검색
export const requestGetSearchConcert = async (query: string) => {
  const { data } = await publicAxios.get<SearchConcertResponse>(
    `${endPoint.GET_CONCERT_SEARCH_LIST}?query=${query}`
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
