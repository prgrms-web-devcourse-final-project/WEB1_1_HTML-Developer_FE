import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { useGetRelateConcert } from 'queries/concertHall';
import { ChipText, SmallText } from 'styles/Typography';
import { formatDateRange } from 'utils';

interface RelatedConcertProps {
  hallCode: string;
}

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
    cursor: pointer;
  }

  &:nth-last-of-type(1) {
    margin-right: 1.6rem;
  }
`;

const PosterContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 15rem;
  height: 20rem;
  margin-bottom: 1.2rem;
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

const RelatedConcert = ({ hallCode }: RelatedConcertProps) => {
  const { data } = useGetRelateConcert(hallCode);
  const navigate = useNavigate();

  const handleConcertClick = (concertId: number) => {
    navigate(`/concerts/${concertId}`);
  };

  return (
    <RelatedConcertContainer>
      <ConcertList>
        {data?.map((concert) => (
          <ConcertItem key={concert.id} onClick={() => handleConcertClick(concert.id)}>
            <PosterContainer>
              <PosterImg alt={concert.title} src={concert.imageUrl} />
            </PosterContainer>
            <ConcertName>{concert.title}</ConcertName>
            <ConcertDate>{formatDateRange(concert.startDate, concert.endDate)}</ConcertDate>
          </ConcertItem>
        ))}
      </ConcertList>
    </RelatedConcertContainer>
  );
};

export default RelatedConcert;
