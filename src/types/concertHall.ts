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

export interface concertHallDetail {
  name: string;
  seatScale: number;
  star: number;
  convenienceInfo: ConvenienceInfo;
  location: ConcertHallLocation;
}

export type HallDetailResponse = ApiResponse<concertHallDetail>;
