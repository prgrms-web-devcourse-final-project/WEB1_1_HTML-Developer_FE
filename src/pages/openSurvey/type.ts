import type { Concert } from 'pages/concert/type';

export interface SurveyFormData {
  title: string;
  concertId: number | null;
  boardingDates: string[];
  artistName: string;
  region: string;
  maxPassenger: string;
  endDate: string;
  information: string;
}

export interface ConcertResponse {
  timeStamp: Date;
  code: string;
  message: string;
  result: Concert[];
}

export interface ArtistResponse {
  timeStamp: Date;
  code: string;
  message: string;
  result: Artist[];
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
}

export interface Image {
  url: string;
}
