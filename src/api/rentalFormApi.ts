import { endPoint } from 'constants/endPoint';
import type { SearchArtistResponse, SearchConcertResponse } from 'types';
import { publicAxios } from 'utils';

// 공연 검색
export const requestGetSearchConcert = async (query: string) => {
  return (
    await publicAxios.get<SearchConcertResponse>(
      `${endPoint.GET_CONCERT_SEARCH_LIST}?query=${query}`
    )
  ).data.result;
};

// 아티스트 검색
export const requestGetSearchArtist = async (query: string) => {
  return (await publicAxios.get<SearchArtistResponse>(`${endPoint.SEARCH_ARTISTS}?query=${query}`))
    .data.result;
};
