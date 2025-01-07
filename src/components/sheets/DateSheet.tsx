import styled from '@emotion/styled';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import Calendar from 'components/calendar/Calendar';
import { useModalStore } from 'stores';
import { TitleText2 } from 'styles/Typography';

interface DateSheetProps {
  title: string;
  isAllowFromToday?: boolean;
  onDateSelect?: (date: string) => void;
}

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateSheet = ({ title, isAllowFromToday = false, onDateSelect }: DateSheetProps) => {
  const { closeModal } = useModalStore(['closeModal']);

  const handleEndDateSelect = (date: string) => {
    onDateSelect?.(date);
    closeModal('bottomSheet', 'list');
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <TitleText2>{title}</TitleText2>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <CalendarWrapper>
          <Calendar
            isAllowFromToday={isAllowFromToday}
            onSelect={(date) => handleEndDateSelect(date)}
          />
        </CalendarWrapper>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default DateSheet;
