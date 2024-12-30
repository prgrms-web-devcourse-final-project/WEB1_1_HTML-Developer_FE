import type { ApiResponse } from './api';
import type { Region } from './filter';
import type { BusSize, BusType, RefundType } from './rental';

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

export interface FormDetailInfo {
  imageUrl: string;
  title: string;
  region: Region | null;
  depositAccount: string;
  concertId: number;
  artistName: string;
}

export interface BusInfo {
  busSize: BusSize | null;
  busType: BusType | null;
  maxPassenger: number;
}

export interface FormDrivingData {
  boardingArea: string;
  upTime: string;
  downTime: string;
  boardingDates: string[];
  roundPrice: number;
  upTimePrice: number;
  downTimePrice: number;
}

// data 전송 시 필요한 운행 정보 데이터
export interface FormDrivingInfo extends FormDrivingData, BusInfo {}

// 유효성 검사 시 필요한 운행 정보 데이터
export interface FormDrivingFields extends FormDrivingData {
  busInfo: string;
}

export interface FormAdditionalInfo {
  recruitmentCount: number;
  endDate: string;
  chatUrl: string;
  refundType: RefundType | null;
  information: string;
}

export interface RentalFormData extends FormDetailInfo, FormDrivingInfo, FormAdditionalInfo {}
export interface RentalFormFields extends FormDetailInfo, FormDrivingFields, FormAdditionalInfo {}

export type SearchConcertResponse = ApiResponse<SearchConcert>;
export type SearchArtistResponse = ApiResponse<SearchArtist[]>;
