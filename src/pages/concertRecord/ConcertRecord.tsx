import styled from '@emotion/styled';
import { useState } from 'react';

import RecordCalendar from './components/RecordCalendar';
import RecordDetails from './components/RecordDetails';

const ConcertRecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  padding: 2.4rem;
`;

const ConcertRecord = () => {
  const [recordId, setRecordId] = useState<string | null>(null);

  return (
    <ConcertRecordContainer>
      <RecordCalendar onDateSelect={(id) => setRecordId(id)} onMove={() => setRecordId(null)} />
      {recordId && <RecordDetails id={recordId} />}
    </ConcertRecordContainer>
  );
};

export default ConcertRecord;
