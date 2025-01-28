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

export interface SeatReview {
  reviewId: number;
  seat: string;
  content: string;
  star: number;
  memberId: number;
  hallId: string;
  viewDate: string;
  createdAt: string;
  imageUrls: string[];
  likeCount: number;
  liked: boolean;
}

export type SeatReviewSort = 'CREATED_AT' | 'LIKE_COUNT';

export type HallDetailResponse = ApiResponse<ConcertHallDetail>;
export type SeatReviewResponse = ApiResponse<SeatReview[]>;
