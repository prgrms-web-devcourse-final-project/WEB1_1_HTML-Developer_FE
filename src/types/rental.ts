import type { ApiResponse } from './api';
import type { Region } from './filter';
import type { BankAccount } from './user';

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
  isApplied?: boolean;
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
  refundAccount?: BankAccount;
  closed: boolean;
}

export interface DepositAccount {
  depositAccount: string | null;
}

export interface DepositFormData {
  rentId: number;
  depositorName: string;
  depositorTime: string;
  phone: string;
  passengerNum: number;
  boardingDate: string;
  boardingType: BoardingType | null;
  refundType: RefundType | null;
  refundAccount: string | null;
}

export interface ManagingRental {
  rentId: number;
  title: string;
  boardingDate: string;
  boardingArea: string;
  rentStartDate: string;
  rentEndDate: string;
  recruitmentCount: number;
  participationCount: number;
  isClosed: boolean;
  busSize: BusSize;
  busType: BusType;
  maxPassenger: number;
}

interface RentJoinDetail {
  rentJoinId: number;
  applyDate: string;
  depositorName: string;
  phone: string;
  passengerNum: number;
  boardingType: BoardingType;
  depositorTime: string;
  refundType: RefundType;
  rentAccount: string;
}

export interface ManagingRentalDetail extends ManagingRental {
  rentUpCount: number;
  rentDownCount: number;
  rentRoundCount: number;
  additionalDepositCount: number;
  refundCount: number;
  rentJoinDetailResponses: RentJoinDetail[];
}

export interface AllRentalDetail extends RentalDetail, DepositAccount {}

export type RentalListResponse = ApiResponse<RentalList[]>;
export type RentalDetailResponse = ApiResponse<RentalDetail>;
export type RentalAccountResponse = ApiResponse<DepositAccount>;

export type ManagingRentalListResponse = ApiResponse<ManagingRental[]>;
export type ManagingRentalDetailResponse = ApiResponse<ManagingRentalDetail>;

export type DepositFormResponse = ApiResponse<0>;
