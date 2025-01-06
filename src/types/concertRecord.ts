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
  diaryId: number;
  concertPoster: ConcertPoster;
  date: string;
}

interface DiaryImages {
  url: string;
}

export interface ConcertRecordDetail {
  concertTitle: string;
  concertPoster: ConcertPoster;
  diaryDate: string;
  episode: string;
  seatName: string;
  diaryImages: DiaryImages[];
  content: string;
}

export type RecordListResponse = ApiResponse<ConcertRecord[]>;
export type RecordDetailResponse = ApiResponse<ConcertRecordDetail>;
