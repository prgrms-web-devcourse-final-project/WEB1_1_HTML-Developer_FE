export interface ApiResponse<T> {
  timeStamp: string;
  status: number;
  message: string;
  result: T;
}
