import styled from '@emotion/styled';

import RecordCalendar from './components/RecordCalendar';
import RecordDetails from './components/RecordDetails';

import { useConcertRecordStore } from 'stores';

const ConcertRecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  padding: 2.4rem;
`;

const ConcertRecord = () => {
  const { recordData } = useConcertRecordStore(['recordData']);
  const { id } = recordData;

  return (
    <ConcertRecordContainer>
      <RecordCalendar />
      {id && <RecordDetails id={id} />}
    </ConcertRecordContainer>
  );
};

export default ConcertRecord;
