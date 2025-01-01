import styled from '@emotion/styled';
import { LuCalendar } from 'react-icons/lu';

import type { Concert } from 'pages/concert/type';
import { ChipText, SmallText } from 'styles/Typography';

interface ConcertItemProps {
  concert: Concert;
  onSelect?: (concert: Concert) => void;
}
const SelectedConcertItem = ({ concert, onSelect }: ConcertItemProps) => {
  return (
    <Wrapper key={concert.id} onClick={() => onSelect?.(concert)}>
      <img alt="posterImg" src={concert.poster} />
      <Content>
        <ChipText className="title">{concert.title}</ChipText>
        <ConcertInfo>
          <SmallText>{concert.concertHallName}</SmallText>
          <Place>
            <LuCalendar size={16} />
            <SmallText>
              {concert.stdate} - {concert.eddate}
            </SmallText>
          </Place>
        </ConcertInfo>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  padding: 1.2rem 0;

  img {
    width: 7.5rem;
    height: 10rem;

    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  .title {
    color: ${({ theme }) => theme.colors.dark[100]};
  }
`;

const Place = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ConcertInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

export default SelectedConcertItem;
