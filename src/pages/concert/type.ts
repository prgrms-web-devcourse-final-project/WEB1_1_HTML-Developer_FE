export interface Concert {
  poster: string;
  title: string;
  concertHallName: string;
  stdate: string;
  eddate: string;
  id: number;
}

interface SearchAfter {
  0: number;
  1: string;
}

export interface Result {
  concertThumbnails: Concert[];
  searchAfter: SearchAfter;
}

export interface ConcertsType {
  timeStamp: string;
  code: string;
  message: string;
  result: Result;
}

export type FilterCategory = '지역' | '정렬';
