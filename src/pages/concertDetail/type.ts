export interface ConcertInfoProps {
  data: ConcertDetailData | undefined;
}

interface Poster {
  url: string;
}

interface DetailImage {
  url: string;
}

interface DateInfo {
  startDate: string;
  endDate: string;
  timeTable: string;
}

interface ConcertInfo {
  title: string;
  price: string;
  performStatus: string;
  host: string;
  dateInfo: DateInfo;
}

interface Seller {
  name: string;
  salesUrl: string;
}

interface ConvenienceInfo {
  hasParkingLot: boolean;
  hasRestaurant: boolean;
  hasCafe: boolean;
  hasStore: boolean;
  hasDisabledParking: boolean;
  hasDisabledToilet: boolean;
  hasElevator: boolean;
  hasRunway: boolean;
}

export interface ConcertDetailData {
  poster: Poster;
  detailImages: DetailImage[];
  concertInfo: ConcertInfo;
  sellers: Seller[];
  hallCode: string;
  hallName: string;
  seatScale: number;
  convenienceInfo: ConvenienceInfo;
  address: string;
}

export interface ConcertResponse {
  timeStamp: string;
  code: string;
  message: string;
  result: ConcertDetailData;
}

export interface InfoItem {
  label: string;
  value: string | string[];
}
