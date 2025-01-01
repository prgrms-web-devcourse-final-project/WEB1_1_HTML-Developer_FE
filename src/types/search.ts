import type { ApiResponse } from './api';

export interface ConcertData {
  id: number;
  poster: string;
  title: string;
  concertHallName: string;
  stdate: string;
  eddate: string;
}

interface SearchAfter {
  searchAfter1: string;
  searchAfter2: string;
}

export interface SearchConcert {
  concertThumbnails: ConcertData[];
  searchAfter: SearchAfter[] | null;
}

interface SearchArtistImages {
  url: string;
  width: number;
  height: number;
}

export interface SearchArtist {
  id: string;
  name: string;
  images: SearchArtistImages[];
}

export type SearchConcertResponse = ApiResponse<SearchConcert>;
export type SearchArtistResponse = ApiResponse<SearchArtist[]>;
