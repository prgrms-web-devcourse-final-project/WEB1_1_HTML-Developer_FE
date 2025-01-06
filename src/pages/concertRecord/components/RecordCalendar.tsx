import styled from '@emotion/styled';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { useGetConcertRecordList } from 'queries/concertRecord';
import { useConcertRecordStore } from 'stores/concertRecordStore';
import { BodyRegularText, ChipText } from 'styles/Typography';

export interface DateButtonProps {
  imageUrl?: string;
  isToday?: boolean;
  isCurrentMonth?: boolean;
}

const CalendarWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
`;

const NavigationButton = styled.button`
  padding: 0.4rem;
  background: transparent;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

const HeaderTitle = styled.span`
  color: ${({ theme }) => theme.colors.dark[50]};
`;

const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.dark[200]};
  text-align: center;
`;

const WeekdayCell = styled.div`
  padding: 0.8rem;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.2rem;
`;

const DateButton = styled.button<DateButtonProps>`
  display: flex;
  position: relative;
  width: 100%;
  height: 8rem;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.dark[800]};
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  color: ${(props) => {
    if (!props.isCurrentMonth) return ({ theme }) => theme.colors.dark[300];
    return ({ theme }) => theme.colors.dark[100];
  }};
  transition: all 0.2s ease-in-out;

  ${({ isToday, theme }) =>
    isToday &&
    `
    span::before {
      content: '';
      position: absolute;
      top: 0.75rem;
      left: 0.25rem;
      z-index: -1;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: ${theme.colors.primary};
    }

    span {
      z-index: 1;
      color: ${theme.colors.dark[100]};
    }
  `}

  &:hover, &:active {
    background-color: ${({ theme }) => theme.colors.dark[700]};
    filter: ${({ imageUrl }) => (imageUrl ? 'opacity(60%)' : 'none')};
  }
`;

const RecordCalendar = () => {
  const navigate = useNavigate();
  const { updateRecordData, resetRecordData } = useConcertRecordStore([
    'updateRecordData',
    'resetRecordData',
  ]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const { data: recordList } = useGetConcertRecordList(
    Number(currentMonth.format('YYYY')),
    Number(currentMonth.format('MM'))
  );

  // 월 변경
  const changeMonth = (type: 'prev' | 'next' | 'today') => {
    switch (type) {
      case 'prev':
        setCurrentMonth(currentMonth.subtract(1, 'month'));
        break;
      case 'next':
        setCurrentMonth(currentMonth.add(1, 'month'));
        break;
      case 'today':
        setCurrentMonth(dayjs());
        break;
    }
  };

  // 달력 생성
  const generateCalendar = () => {
    const startWeek = currentMonth.startOf('month').startOf('week');
    const endWeek = currentMonth.endOf('month').endOf('week');
    const days = [];

    let day = startWeek;
    while (day.isBefore(endWeek) || day.isSame(endWeek, 'day')) {
      days.push({
        date: day,
        isCurrentMonth: day.month() === currentMonth.month(),
      });
      day = day.add(1, 'day');
    }

    return days;
  };

  const isToday = (date: Dayjs) => {
    return date.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
  };

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const handlePrevClick = () => {
    changeMonth('prev');
    resetRecordData();
  };

  const handleNextClick = () => {
    changeMonth('next');
    resetRecordData();
  };

  const handleDateSelect = (id: number | null, date: Dayjs, isRecordExist: boolean) => {
    const formattedDate = date.format('YYYY-MM-DD');

    if (!isRecordExist) {
      navigate('/concert-record/create', { state: { date: formattedDate } });
    }

    if (id) {
      updateRecordData({ id: id.toString(), date: formattedDate });
    }
  };

  const concertData = useCallback(
    (date: Dayjs) => {
      const record = recordList?.find((record) => record.date === date.format('YYYY-MM-DD'));
      return record
        ? { url: record?.concertPoster.url, id: record?.diaryId }
        : { url: null, id: null };
    },
    [recordList]
  );

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <NavigationButton onClick={handlePrevClick}>
          <TbChevronLeft size={16} />
        </NavigationButton>
        <HeaderTitle onClick={() => changeMonth('today')}>
          <BodyRegularText>{currentMonth.format('YYYY년 MM월')}</BodyRegularText>
        </HeaderTitle>
        <NavigationButton onClick={handleNextClick}>
          <TbChevronRight size={16} />
        </NavigationButton>
      </CalendarHeader>
      <WeekdayHeader>
        {weekDays.map((day) => (
          <WeekdayCell key={day}>
            <ChipText>{day}</ChipText>
          </WeekdayCell>
        ))}
      </WeekdayHeader>
      <DateGrid>
        {generateCalendar().map(({ date, isCurrentMonth }, index) => {
          const { url, id } = concertData(date);
          return (
            <DateButton
              imageUrl={url || ''}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday(date)}
              key={index}
              onClick={() => handleDateSelect(id, date, !!url)}
            >
              <ChipText>{date.format('D')}</ChipText>
            </DateButton>
          );
        })}
      </DateGrid>
    </CalendarWrapper>
  );
};

export default RecordCalendar;
