import styled from '@emotion/styled';
import { FiPlusCircle } from 'react-icons/fi';
import { TbClipboardText } from 'react-icons/tb';

import BaseButton from 'components/buttons/BaseButton';
import { MediumButtonText, TitleText2 } from 'styles/Typography';

const EmptySurvey = () => {
  return (
    <EmptySurveyWrapper>
      <IconWrapper>
        <TbClipboardText size={36} strokeWidth={1.5} />
      </IconWrapper>
      <TitleText2>참여 중인 수요 조사가 없어요!</TitleText2>
      <BaseButton color="primary" size="medium" to="/surveys" variant="fill">
        <ButtonTextWrapper>
          <FiPlusCircle size={24} />
          <MediumButtonText>수요 조사 보러가기</MediumButtonText>
        </ButtonTextWrapper>
      </BaseButton>
    </EmptySurveyWrapper>
  );
};

const EmptySurveyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 2.4rem 0;
`;

const IconWrapper = styled.div`
  border-radius: 50%;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.dark[500]};
`;

const ButtonTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export default EmptySurvey;
