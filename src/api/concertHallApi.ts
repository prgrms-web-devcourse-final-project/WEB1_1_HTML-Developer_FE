import { endPoint } from 'constants/endPoint';
import type { HallDetailResponse, RelateConcertResponse, SeatReviewResponse } from 'types';
import { publicAxios, tokenAxios } from 'utils';

export const requestGetHallDetails = async (id: string) => {
  return await publicAxios.get<HallDetailResponse>(endPoint.GET_CONCERT_HALL(id));
};

export const requestGetSeatReviews = async (query: string) => {
  return await tokenAxios.get<SeatReviewResponse>(`${endPoint.GET_SEAT_REVIEW}?${query}`);
};

export const requestGetRelateConcerts = async (query: string) => {
  return await publicAxios.get<RelateConcertResponse>(`${endPoint.GET_RELATE_CONCERT}?${query}`);
};
