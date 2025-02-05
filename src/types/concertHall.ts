import type { ApiResponse } from './api';

// concert hall detail
export interface ConvenienceInfo {
  hasParkingLot: boolean;
  hasRestaurant: boolean;
  hasCafe: boolean;
  hasStore: boolean;
  hasDisabledParking: boolean;
  hasDisabledToilet: boolean;
  hasElevator: boolean;
  hasRunway: boolean;
}

export interface ConcertHallLocation {
  longitude: number;
  latitude: number;
  address: string;
}

export interface ConcertHallDetail {
  name: string;
  seatScale: number;
  star: number;
  convenienceInfo: ConvenienceInfo;
  location: ConcertHallLocation;
}

// Seat Review
export interface SeatReview {
  reviewId: number;
  seat: string;
  concertTitle: string;
  content: string;
  star: number;
  memberId: number;
  hallId: string;
  viewDate: string;
  createdAt: string;
  imageUrls: string[] | [];
  profileImageUrl: string;
  nickname: string;
  writer: boolean;
}

export interface SeatReviewParams {
  lastId: number | null;
  lastCreatedAt: string | null;
}

export type SeatReviewSort = 'CREATED_ASC' | 'CREATED_DESC';

// Relate Concert
export interface RelateConcert {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  viewCount: number;
}

export type HallDetailResponse = ApiResponse<ConcertHallDetail>;
export type SeatReviewResponse = ApiResponse<SeatReview[]>;
export type RelateConcertResponse = ApiResponse<RelateConcert[]>;
