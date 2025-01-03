import type { ApiResponse } from './api';
interface Artist {
  name: string;
  artistId: string;
}

export interface UserInfo {
  email: string;
  nickname: string;
  introduce: string | null;
  profileImageUrl: string;
  artists: Artist[];
  bank: string | null;
  number: string | null;
}

export interface BankAccount {
  bank: string;
  number: string;
}
export type RefundAccountForm = BankAccount;

export type UserInfoResponse = ApiResponse<UserInfo>;
