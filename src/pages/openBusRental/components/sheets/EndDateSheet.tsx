import styled from '@emotion/styled';

import EndDateCalendar from '../items/EndDateCalendar';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import { useModalStore, useRentalFormStore } from 'stores';
import { TitleText2 } from 'styles/Typography';

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EndDateSheet = () => {
  const { updateFormData } = useRentalFormStore(['updateFormData']);
  const { closeModal } = useModalStore(['closeModal']);

  const handleEndDateSelect = (date: string) => {
    updateFormData('endDate', date);
    closeModal('bottomSheet', 'list');
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <TitleText2>모집 마감 날짜</TitleText2>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <CalendarWrapper>
          <EndDateCalendar isAllowFromToday onDateSelect={(date) => handleEndDateSelect(date)} />
        </CalendarWrapper>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default EndDateSheet;
