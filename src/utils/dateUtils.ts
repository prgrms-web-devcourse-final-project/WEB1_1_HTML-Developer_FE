import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

// D-Day 계산
export const getDday = (endDate: string) => {
  const deadline = dayjs(endDate, 'YYYY-MM-DD', true);
  if (!deadline.isValid()) return 0;

  return deadline.diff(dayjs(), 'day');
};

// ISO Date -> YY.MM.DD(요일) 형식으로 변환
export const formatDateWithDay = (dateString: string) => {
  const date = dayjs(dateString);
  const dayOfWeek = date.format('dd');
  return `${date.format('YYYY.MM.DD')}(${dayOfWeek})`;
};

// 시작일, 종료일 사이 날짜를 배열로 반환
export const getDateRange = (startDate: string, endDate: string) => {
  const dates = [];
  let currentDate = dayjs(startDate);
  const lastDate = dayjs(endDate);

  while (currentDate.isSame(lastDate) || currentDate.isBefore(lastDate)) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};
