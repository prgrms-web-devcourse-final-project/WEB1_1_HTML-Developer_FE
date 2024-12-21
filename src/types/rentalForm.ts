import type { ApiResponse } from './api';
import type { BusSize, BusType, RefundType } from './rental';

import type { Region } from 'constants/filterTypes';

export interface ConcertData {
  id: number;
  poster: string;
  title: string;
  concertHallName: string;
  stDate: string;
  edDate: string;
}

interface SearchAfter {
  searchAfter1: string;
  searchAfter2: string;
}

export interface SearchConcert {
  concertThumbnails: ConcertData[];
  searchAfter: SearchAfter[] | null;
}

export interface SearchArtist {
  id: string;
  name: string;
}

export interface RentalFormValues {
  concertId: number;
  imageUrl: string;
  title: string;
  artistName: string;
  region: Region;
  depositAccount: string;
  boardingArea: string;
  upTime: string;
  downTime: string;
  rentBoardingDateRequests: string[];
  busSize: BusSize;
  busType: BusType;
  maxPassenger: number;
  roundPrice: number;
  upTimePrice: number;
  downTimePrice: number;
  recruitmentCount: number;
  endDate: string;
  chatUrl: string;
  refundType: RefundType;
  information: string;
}

export type SearchConcertResponse = ApiResponse<SearchConcert>;
export type SearchArtistResponse = ApiResponse<SearchArtist[]>;
