export type Param = [string, string] | null;

export interface ConcertResult {
  concertThumbnails: ConcertThumbnails[];
  searchAfter: Param;
}

export interface RentResult {
  rentThumbnails: RentThumbnails[];
  searchAfter: Param;
}

export interface SurveyResult {
  surveyThumbnails: SurveyThumbnails[];
  searchAfter: Param;
}

interface ConcertThumbnails {
  poster: string;
  title: string;
  concertHallName: string;
  stdate: string;
  eddate: string;
  id: number;
  episodes: string[];
}

interface RentThumbnails {
  id: number;
  title: string;
  boardingArea: string;
  imageUrl: string;
  edDate: string;
}

interface SurveyThumbnails {
  id: number;
  title: string;
  region: string;
  participantNum: number;
  edDate: string;
}

export interface GetMoreProps {
  keyword: string;
  searchAfter: [string, string] | null;
}
