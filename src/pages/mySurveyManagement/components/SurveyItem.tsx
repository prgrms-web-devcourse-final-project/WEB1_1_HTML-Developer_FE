import styled from '@emotion/styled';
import { useState } from 'react';
import { TbChevronDown } from 'react-icons/tb';

import BaseButton from 'components/buttons/BaseButton';
import { TitleText2 } from 'styles/Typography';
import type { SurveyResponse } from 'types';

interface SurveyItemProps {
  survey: SurveyResponse;
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
  } = survey;
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
