import styled from '@emotion/styled';
import { LuCalendar } from 'react-icons/lu';
import { PiMapPinFill } from 'react-icons/pi';

import { BodyMediumText, CaptionText } from 'styles/Typography';
import type { ConcertData } from 'types';
import { formatDateRange } from 'utils';

interface SearchConcertItemProps {
  concertData: ConcertData;
  isInactive?: boolean;
  onClick?: (concertData: ConcertData) => void;
}

const ConcertTitle = styled(BodyMediumText)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1.2rem;
`;

const ConcertItemContainer = styled.div<{ isInactive?: boolean }>`
  display: flex;
  align-items: stretch;
  gap: 1.6rem;
  width: 100%;
  height: fit-content;
  padding: 1.2rem 0;
  pointer-events: ${({ isInactive }) => (isInactive ? 'none' : 'auto')};
  cursor: pointer;

  &:hover,
  &:active {
    ${ConcertTitle} {
      color: ${({ theme }) => theme.colors.dark[100]};
      text-decoration: underline;
    }
  }
`;

const ConcertPoster = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 7.5rem;
  height: 10rem;
`;

const PosterImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const ConcertContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConcertHall = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: auto;
  margin-bottom: 0.4rem;

  svg {
    flex-shrink: 0;
  }
`;

const ConcertHallName = styled(CaptionText)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  svg {
    flex-shrink: 0;
  }
`;

const SearchConcertItem = ({ concertData, isInactive, onClick }: SearchConcertItemProps) => {
  const { poster, title, concertHallName, stdate, eddate } = concertData;

  const handleConcertClick = () => {
    onClick?.(concertData);
  };

  return (
    <ConcertItemContainer isInactive={isInactive} onClick={handleConcertClick}>
      <ConcertPoster>
        <PosterImg alt="Concert Poster" src={poster} />
      </ConcertPoster>
      <ConcertContent>
        <ConcertTitle>{title}</ConcertTitle>
        <ConcertHall>
          <PiMapPinFill size={16} />
          <ConcertHallName>{concertHallName}</ConcertHallName>
        </ConcertHall>
        <Date>
          <LuCalendar size={16} />
          <CaptionText>{formatDateRange(stdate, eddate)}</CaptionText>
        </Date>
      </ConcertContent>
    </ConcertItemContainer>
  );
};

export default SearchConcertItem;
