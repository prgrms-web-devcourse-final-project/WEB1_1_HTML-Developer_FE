import styled from '@emotion/styled';
import { LuCalendar } from 'react-icons/lu';
import { PiMapPin } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import { CaptionText, ChipText, TitleText2 } from 'styles/Typography';
import type { ManagingRental } from 'types';

interface RentalItemProps {
  rental: ManagingRental;
}

const RentalItem = ({ rental }: RentalItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rental-management/${rental.rentId}`, {
      state: { boardingDate: rental.boardingDate },
    });
  };

  return (
    <Container onClick={handleClick}>
      <TitleSection>
        <TitleText2>{rental.title}</TitleText2>
      </TitleSection>

      <InfoWrapper>
        <InfoGroup>
          <InfoLabel>
            <LuCalendar size={16} />
            <ChipText>공연일</ChipText>
          </InfoLabel>
          <CaptionText>{rental.boardingDate}</CaptionText>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>
            <PiMapPin size={16} />
            <ChipText>출발지</ChipText>
          </InfoLabel>
          <CaptionText>{rental.boardingArea}</CaptionText>
        </InfoGroup>
      </InfoWrapper>

      <RecruitmentPeriod>
        <CaptionText>{rental.isClosed ? '차량 대절 마감' : '차량 대절 진행중'}</CaptionText>
        <CaptionText>
          {new Date(rental.rentStartDate).toLocaleDateString()} ~
          {new Date(rental.rentEndDate).toLocaleDateString()}
        </CaptionText>
      </RecruitmentPeriod>

      <ProgressSection>
        <InfoWrapper>
          <CaptionText>전체 신청 인원</CaptionText>
          <CaptionText>
            {rental.participationCount} / {rental.recruitmentCount}명
          </CaptionText>
        </InfoWrapper>
        <ProgressBar>
          <ProgressFill
            style={{
              width: `${(rental.participationCount / rental.recruitmentCount) * 100}%`,
            }}
          />
        </ProgressBar>
      </ProgressSection>
    </Container>
  );
};

// 카드 컨테이너
const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.dark[700]};
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.5rem;
  padding: 1.6rem;
  color: white;
  width: 100%;
  cursor: pointer;
`;

// 제목 영역
const TitleSection = styled.div`
  margin-bottom: 1rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
`;

const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const InfoGroup = styled.div`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  padding: 0.8rem;
  gap: 0.4rem;
  border-radius: 4px;
`;

// 프로그레스 바 영역
const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.dark[50]};
`;

const ProgressBar = styled.div`
  background-color: #e1e3e8;
  border-radius: 9999px;
  height: 1rem;
`;

const ProgressFill = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;
  border-radius: 9999px;
  transition: width 0.3s ease;
`;

// 모집 기간 영역
const RecruitmentPeriod = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.dark[200]};

  span:first-child {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export default RentalItem;
