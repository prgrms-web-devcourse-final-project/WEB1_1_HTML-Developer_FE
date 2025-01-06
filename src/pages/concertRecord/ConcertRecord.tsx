import styled from '@emotion/styled';
import { useState } from 'react';

import RecordCalendar from './components/RecordCalendar';
import RecordDetails from './components/RecordDetails';

import { useConcertRecordStore } from 'stores/concertRecordStore';

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
