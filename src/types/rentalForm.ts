import type { Region } from './filter';
import type { BusSize, BusType, RefundType } from './rental';

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
