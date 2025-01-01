import type { ApiResponse } from './api';
import type { Region } from './filter';

// Rental List
export interface RentalList {
  rentId: number;
  title: string;
  boardingArea: string;
  endDate: string;
  imageUrl: string;
}

// Rental Details
export const BUS_SIZE = {
  LARGE: '대형',
  MEDIUM: '중형',
  MINI: '미니',
} as const;

export const BUS_TYPE = {
  STANDARD: '일반',
  DELUXE: '우등',
  PREMIUM: '프리미엄',
} as const;

export const REFUND_TYPE = {
  ADDITIONAL_DEPOSIT: '추가 입금',
  REFUND: '환불',
  BOTH: '둘 다',
} as const;

export const BOARDING_TYPE = {
  ROUND: '왕복',
  UP: '상행',
  DOWN: '하행',
} as const;

export type BusSize = keyof typeof BUS_SIZE;
export type BusType = keyof typeof BUS_TYPE;
export type RefundType = keyof typeof REFUND_TYPE;
export type BoardingType = keyof typeof BOARDING_TYPE;

export interface BoardingDates {
  date: string;
  participationCount: number;
}

export interface RentalDetail {
  concertName: string;
  imageUrl: string;
  title: string;
  artistName: string;
  region: Region;
  boardingArea: string;
  dropOffArea: string;
  upTime: string;
  downTime: string;
  boardingDates: BoardingDates[];
  busSize: BusSize;
  busType: BusType;
  maxPassenger: number;
  roundPrice: number;
  upTimePrice: number;
  downTimePrice: number;
  recruitmentCount: number;
  endDate: string;
  chatUrl: string;
  refundType: RefundType;
  information: string;
  isClosed: boolean;
}

export interface RentalAccount {
  depositAccount: string | null;
}

export interface DepositFormValues {
  rentId: number | null;
  depositorName: string;
  depositorTime: string;
  phone: string;
  passengerNum: number;
  boardingDate: string;
  boardingType: BoardingType | null;
  refundType: RefundType | null;
  refundAccount: string;
}

export interface AllRentalDetail extends RentalDetail, RentalAccount {}

export type RentalListResponse = ApiResponse<RentalList[]>;
export type RentalDetailResponse = ApiResponse<RentalDetail>;
export type RentalAccountResponse = ApiResponse<RentalAccount>;
