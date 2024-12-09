import styled from '@emotion/styled';
import { FaUserGroup } from 'react-icons/fa6';

import Badge from 'components/badge/Badge';
import { CaptionText } from 'styles/Typography';

interface ParticipantsStatusProps {
  rentDates: string[];
  participants: number[];
  recruitmentCount: number;
}

const StatusContainer = styled.div``;

const StatusWrapper = styled.div`
  margin-bottom: 0.8rem;
  padding: 1.6rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  &:not(:last-of-type) {
    margin-bottom: 1.2rem;
  }
`;

const RentDate = styled(CaptionText)<{ isClosed: boolean }>`
  color: ${({ isClosed, theme }) => (isClosed ? theme.colors.dark[300] : theme.colors.dark[100])};
  text-decoration: ${({ isClosed }) => (isClosed ? 'line-through' : 'none')};
`;

const ParticipantNums = styled(CaptionText)<{ isClosed: boolean }>`
  margin-left: auto;
  color: ${({ isClosed, theme }) => (isClosed ? theme.colors.red : theme.colors.dark[100])};
`;

const StatusDescription = styled(CaptionText)`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const ParticipantsStatus = ({
  rentDates,
  participants,
  recruitmentCount,
}: ParticipantsStatusProps) => {
  return (
    <StatusContainer>
      <StatusWrapper>
        {rentDates.map((date, idx) => {
          const isClosed = participants[idx] === recruitmentCount;
          return (
            <StatusItem key={date}>
              <Badge color={isClosed ? 'red' : 'gray'} size="small" variant="square">
                {isClosed ? '마감완료' : '신청가능'}
              </Badge>
              <RentDate isClosed={isClosed}>{date}</RentDate>
              <ParticipantNums isClosed={isClosed}>
                {participants[idx] || 0} / {recruitmentCount}
              </ParticipantNums>
            </StatusItem>
          );
        })}
      </StatusWrapper>
      <StatusDescription>
        <FaUserGroup size={16} />
        지금 참여 중인 인원
      </StatusDescription>
    </StatusContainer>
  );
};

export default ParticipantsStatus;
