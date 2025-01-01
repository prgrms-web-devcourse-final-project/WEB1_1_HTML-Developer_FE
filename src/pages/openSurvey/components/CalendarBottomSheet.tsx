import styled from '@emotion/styled';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import Calendar from 'components/calendar/Calendar';

const CalendarBottomSheet = ({ onSelect }: { onSelect: (date: string) => void }) => {
  return (
    <BottomSheet name="basic">
      <BottomSheet.Header>
        <Title>날짜 선택</Title>
      </BottomSheet.Header>

      <CalendarContainer>
        <BottomSheet.Content>
          <Calendar onSelect={onSelect} />
        </BottomSheet.Content>
      </CalendarContainer>
    </BottomSheet>
  );
};

const CalendarContainer = styled.div`
  > div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;
export default CalendarBottomSheet;
