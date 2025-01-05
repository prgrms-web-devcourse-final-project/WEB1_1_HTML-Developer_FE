import styled from '@emotion/styled';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

import type { DateButtonProps } from './types';

import { BodyRegularText, ChipText } from 'styles/Typography';

interface CalendarProps {
  isAllowFromToday?: boolean;
  onSelect?: (date: string) => void;
}

const Calendar = ({ isAllowFromToday = false, onSelect }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

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

  const isSelected = (date: Dayjs) => {
    return date.format('YYYY-MM-DD') === selectedDate;
  };

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDateSelect = (date: Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    onSelect?.(formattedDate);
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <NavigationButton onClick={() => changeMonth('prev')}>
          <TbChevronLeft size={16} />
        </NavigationButton>
        <HeaderTitle onClick={() => changeMonth('today')}>
          <BodyRegularText>{currentMonth.format('YYYY년 MM월')}</BodyRegularText>
        </HeaderTitle>
        <NavigationButton onClick={() => changeMonth('next')}>
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
        {generateCalendar().map(({ date, isCurrentMonth }, index) => (
          <DateButton
            isCurrentMonth={isCurrentMonth}
            isDisabled={isAllowFromToday && date < dayjs()}
            isSelected={isSelected(date)}
            isToday={isToday(date)}
            key={index}
            onClick={() => handleDateSelect(date)}
          >
            <ChipText>{date.format('D')}</ChipText>
          </DateButton>
        ))}
      </DateGrid>
    </CalendarWrapper>
  );
};

export default Calendar;

const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 32.7rem;
  height: fit-content;
  /* padding: 1.6rem; */
  background-color: ${({ theme }) => theme.colors.dark[700]};
  border-radius: 0.5rem;

  & button {
    outline: none;
    border: none;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const NavigationButton = styled.button`
  padding: 0.25rem;
  cursor: pointer;
  background: transparent;

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
  text-align: center;
  color: ${({ theme }) => theme.colors.dark[200]};
  gap: 0.4rem;
`;

const WeekdayCell = styled.div`
  padding: 0.8rem;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
`;

const DateButton = styled.button<DateButtonProps>`
  position: relative;
  width: 100%;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};

  span {
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  color: ${(props) => {
    if (props.isSelected) return ({ theme }) => theme.colors.dark[100];
    if (props.isDisabled) return ({ theme }) => theme.colors.dark[500];
    if (!props.isCurrentMonth) return ({ theme }) => theme.colors.dark[300];
    if (props.isToday) return ({ theme }) => theme.colors.primaryLight;
    return ({ theme }) => theme.colors.dark[100];
  }};
  background-color: ${(props) => {
    if (props.isSelected) return ({ theme }) => theme.colors.primary;
    return 'transparent';
  }};

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${(props) => {
      if (props.isToday) return ({ theme }) => theme.colors.dark[700];
    }};
  }
`;
