import styled from '@emotion/styled';

import EmptySurvey from './components/EmptySurvey';
import SurveyItem from './components/SurveyItem';

import { useMyCreatedSurveys } from 'queries/survey';

const MySurveyManagement = () => {
  const { surveys } = useMyCreatedSurveys();

  return (
    <SurveyPageWrapper>
      <EmptySurvey />
    </SurveyPageWrapper>
  );
};

const SurveyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  padding: 2.4rem;
  flex-grow: 1;
`;

export default MySurveyManagement;
