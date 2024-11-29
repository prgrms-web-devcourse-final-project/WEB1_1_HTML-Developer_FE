export type TabType = 'rentalTab' | 'concertTab' | 'reviewTab';

export const tabMap = {
  rentalTab: ['상세 정보', '운행 정보', '추가 정보'],
  concertTab: ['좌석 리뷰', '관련 공연'],
  reviewTab: ['공연 정보', '좌석 리뷰'],
} as const;

export type TabList = (typeof tabMap)[TabType];
