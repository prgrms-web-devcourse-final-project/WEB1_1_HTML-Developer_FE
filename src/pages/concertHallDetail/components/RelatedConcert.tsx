import styled from '@emotion/styled';

import { ChipText, SmallText } from 'styles/Typography';
import { formatDateRange } from 'utils';

const RelatedConcertContainer = styled.div`
  width: 100%;
  padding: 1.6rem 0 0 2.4rem;
`;

const ConcertList = styled.div`
  display: flex;
  gap: 1.6rem;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.dark[500]};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.black};
  }

  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ConcertItem = styled.div`
  flex-shrink: 0;
  max-width: 15rem;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`;

const PosterContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  margin-bottom: 1.2rem;
  padding-top: 133%;
  border-radius: 4px;
`;

const PosterImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ConcertName = styled(ChipText)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.4rem;
`;

const ConcertDate = styled(SmallText)`
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const dummyData = [
  {
    poster: 'https://tkfile.yes24.com/upload2/PerfBlog/202501/20250108/20250108-52123.jpg',
    concertName: 'DAY6 3RD WORLD TOUR 〈FOREVER YOUNG〉in BUSAN',
    stDate: '2025-02-01',
    edDate: '2025-02-02',
  },
  {
    poster: 'https://ticketimage.interpark.com/Play/image/large/25/25000325_p.gif',
    concertName: '2025 LEECHANGSUB SOLO CONCERT 〈The Wayfarer〉 ENCORE',
    stDate: '2025-02-07',
    edDate: '2025-02-09',
  },
  {
    poster: 'https://ticketimage.interpark.com/Play/image/large/24/24017908_p.gif',
    concertName: '[2024-25 Theatre 이문세］ - 울산',
    stDate: '2025-03-07',
    edDate: '2025-03-08',
  },
];

const RelatedConcert = () => {
  return (
    <RelatedConcertContainer>
      <ConcertList>
        {dummyData.map((concert) => (
          <ConcertItem key={concert.concertName}>
            <PosterContainer>
              <PosterImg alt={concert.concertName} src={concert.poster} />
            </PosterContainer>
            <ConcertName>{concert.concertName}</ConcertName>
            <ConcertDate>{formatDateRange(concert.stDate, concert.edDate)}</ConcertDate>
          </ConcertItem>
        ))}
      </ConcertList>
    </RelatedConcertContainer>
  );
};

export default RelatedConcert;
