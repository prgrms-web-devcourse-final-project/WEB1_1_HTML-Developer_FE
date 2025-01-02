import styled from '@emotion/styled';
import { FaUserGroup } from 'react-icons/fa6';
import { PiMapPinFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import Badge from 'components/badge/Badge';
import { CaptionText, TitleText2 } from 'styles/Typography';
import type { SurveyListItem } from 'types';
import { getDday } from 'utils';

const SurveyItem = ({ surveyId, title, region, participationCount, endDate }: SurveyListItem) => {
  const dDay = getDday(endDate);

  return (
    <SurveyItemContainer>
      <Badge color={dDay > 3 ? 'gray' : 'red'} size="medium" variant="square">
        {dDay === 0 ? `D-Day` : `D-${dDay}`}
      </Badge>
      <TitleText2>{title}</TitleText2>
      <InfoWrapper>
        <div>
          <PiMapPinFill size={18} />
          <CaptionText>{region}</CaptionText>
        </div>
        <div>
          <FaUserGroup size={18} />
          <CaptionText>{participationCount}명 참여중!</CaptionText>
        </div>
      </InfoWrapper>
      <SurveyItemLink to={`/surveys/${surveyId}`} />
    </SurveyItemContainer>
  );
};

const SurveyItemContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem 1.6rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.colors.dark[100]};
  }

  &:active {
    transform: translateY(0);
  }
`;

const SurveyItemLink = styled(Link)`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 1.6rem;

  svg {
    color: ${({ theme }) => theme.colors.dark[200]};
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

export default SurveyItem;
