import styled from '@emotion/styled';

import { BodyRegularText } from 'styles/Typography';

interface BusTimeProps {
  upTime: string;
  downTime: string;
  boardingArea: string;
  dropOffArea: string;
}

const TimeContainer = styled.div``;

const TimeItem = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 1.6rem;
  }
`;

const Label = styled(BodyRegularText)`
  margin-right: 1.6rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const Time = styled(BodyRegularText)`
  margin-right: 0.8rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const BusTime = ({ upTime, downTime, boardingArea, dropOffArea }: BusTimeProps) => {
  const timeData = [
    { label: '상행', time: upTime, area: boardingArea },
    { label: '하행', time: downTime, area: dropOffArea },
  ];

  return (
    <TimeContainer>
      {timeData.map(({ label, time, area }) => (
        <TimeItem key={label}>
          <Label>{label}</Label>
          <Time>{time}</Time>
          <BodyRegularText>{area}</BodyRegularText>
        </TimeItem>
      ))}
    </TimeContainer>
  );
};

export default BusTime;
