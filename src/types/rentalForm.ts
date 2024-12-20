import type { ApiResponse } from './api';

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

export type SearchConcertResponse = ApiResponse<SearchConcert>;
