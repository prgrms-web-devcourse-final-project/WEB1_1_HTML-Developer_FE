import styled from '@emotion/styled';
import { LuCalendar } from 'react-icons/lu';
import { PiMapPinFill } from 'react-icons/pi';

import type { ConcertInfoProps } from '../type';
import IconText from './IconText';

import Badge from 'components/badge/Badge';
import { TitleText1 } from 'styles/Typography';

const PosterContent = ({ data }: ConcertInfoProps) => {
  const { hallName, concertInfo } = data ?? {};
  const { title, dateInfo } = concertInfo ?? {};
  const { startDate, endDate } = dateInfo ?? {};

  return (
    <PosterContentContainer>
      <Wrapper>
        <Badge color="gray" size="medium" variant="round">
          공연 예정
        </Badge>
        <TitleText1>{title}</TitleText1>
        <VenueInfo>
          <IconText icon={<PiMapPinFill size={20} />} text={hallName} />
          <IconText icon={<LuCalendar size={20} />} text={`${startDate} - ${endDate}`} />
        </VenueInfo>
      </Wrapper>
    </PosterContentContainer>
  );
};

const PosterContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 28rem;
  background: linear-gradient(to top, #1b1d1f, rgba(27, 29, 31, 0));
  padding: 0 2.4rem 2.4rem 2.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const VenueInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export default PosterContent;
