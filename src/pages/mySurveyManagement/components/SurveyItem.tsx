import styled from '@emotion/styled';
import { useState } from 'react';
import { TbChevronDown } from 'react-icons/tb';

import BaseButton from 'components/buttons/BaseButton';
import { TitleText2 } from 'styles/Typography';
import type { SurveyDetail } from 'types';

interface SurveyItemProps {
  survey: SurveyDetail;
}

const SurveyItem = ({ survey }: SurveyItemProps) => {
  const {
    surveyId,
    title,
    boardingDate,
    region,
    surveyStartDate,
    surveyEndDate,
    participationCount,
    maxPassenger,
  } = survey.surveyResponse;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SurveyItemWrapper>
      <TitleWrapper>
        <TitleText2>{title}</TitleText2>
        <TbChevronDown size={24} />
      </TitleWrapper>
    </SurveyItemWrapper>
  );
};

const SurveyItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.dark[700]};
  padding: 1.6rem 2rem;
  border-radius: 6px;
`;

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 24px;
`;

const DetailWrapper = styled.div``;

export default SurveyItem;
