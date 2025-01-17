import styled from '@emotion/styled';

import type { ConcertHalls } from '../type';

import { BodyMediumText, CaptionText } from 'styles/Typography';

interface ConcertHallItemProps {
  concertHall: ConcertHalls;
}

const ConcertHallItem = ({ concertHall }: ConcertHallItemProps) => {
  return (
    <Container key={concertHall.id}>
      <BodyMediumText className="hallName">{concertHall.name}</BodyMediumText>
      <CaptionText>{concertHall.address}</CaptionText>
      <CaptionText>{concertHall.seatScale.toLocaleString()}석</CaptionText>
      {Object.entries(concertHall.convenienceInfo)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem;
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};

  .hallName {
    color: ${({ theme }) => theme.colors.dark[100]};
  }
`;

export default ConcertHallItem;
