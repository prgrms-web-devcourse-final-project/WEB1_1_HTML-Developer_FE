import styled from '@emotion/styled';

import SurveyItem from './components/SurveyItem';

import { useSurveyList } from 'queries/survey';
import { BodyRegularText, HeaderText } from 'styles/Typography';

const Surveys = () => {
  const { isLoading, surveyList } = useSurveyList();

  return (
    <>
      <BannerContainer>
        <HeaderText>수요 조사 신청</HeaderText>
        <BodyRegularText>ALLREVA에서 차량 대절 수요 조사를 신청하세요!</BodyRegularText>
      </BannerContainer>

      <SurveyContainer>
        {surveyList?.result.map(({ surveyId, title, region, participationCount, endDate }) => {
          return (
            <SurveyItem
              endDate={endDate}
              key={surveyId}
              participationCount={participationCount}
              region={region}
              surveyId={surveyId}
              title={title}
            />
          );
        })}
      </SurveyContainer>
    </>
  );
};

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 16rem;
  padding: 3.2rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.dark[100]};

  h2 {
    color: ${({ theme }) => theme.colors.dark[700]};
  }
  p {
    color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2rem;
`;

export default Surveys;
