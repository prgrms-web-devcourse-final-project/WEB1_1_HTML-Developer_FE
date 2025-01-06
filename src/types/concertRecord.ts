import type { ApiResponse } from './api';

export interface ConcertRecordForm {
  concertId: number;
  date: string;
  episode: string;
  content: string;
  seatName: string;
  images: File[] | [];
}

interface ConcertPoster {
  url: string;
}

export interface ConcertRecord {
  concertPoster: ConcertPoster;
  date: string;
}

export type RecordListResponse = ApiResponse<ConcertRecord[]>;
