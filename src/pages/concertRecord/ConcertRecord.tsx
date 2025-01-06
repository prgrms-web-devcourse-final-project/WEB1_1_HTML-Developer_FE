import styled from '@emotion/styled';

import RecordCalendar from './components/RecordCalendar';

const ConcertRecordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.4rem;
`;

const ConcertRecord = () => {
  return (
    <ConcertRecordContainer>
      <RecordCalendar />
    </ConcertRecordContainer>
  );
};

export default ConcertRecord;
