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

// ISO Date -> YYYY.MM.DD - YYYY.MM.DD 형식으로 변환
export const formatDateRange = (startDate: string, endDate: string) => {
  const stDate = dayjs(startDate);
  const edDate = dayjs(endDate);

  if (startDate === endDate) return `${stDate.format('YYYY.MM.DD')}`;

  return `${stDate.format('YYYY.MM.DD')} - ${edDate.format('YYYY.MM.DD')}`;
};
