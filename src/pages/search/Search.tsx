import styled from '@emotion/styled';
import { IoChevronDown } from 'react-icons/io5';
import { useNavigate, useOutletContext } from 'react-router-dom';

import RecentSearch from './components/RecentSearch';

import PopularKeyword from 'components/popularKeyword/PopularKeyword';
import { endPoint } from 'constants/endPoint';
import type { SurveysResult } from 'layout/SearchLayout';
import ConcertItem from 'pages/concert/components/ConcertItem';
import type { Concert } from 'pages/concert/type';
import SurveyItem from 'pages/surveys/components/SurveyItem';
import { TitleText2 } from 'styles/Typography';

interface SearchOutlet {
  concertSearchResult: Concert[];
  surveySearchResult: SurveysResult[];
}

const Search = () => {
  const { concertSearchResult, surveySearchResult } = useOutletContext<SearchOutlet>();
  const navigate = useNavigate();

  return (
    <SearchContainer>
      {concertSearchResult.length === 0 ? (
        <>
          <RecentSearch />
          <PopularKeyword />
        </>
      ) : (
        <>
          <ConcertList>
            <TitleText2>예정 공연</TitleText2>
            {concertSearchResult.map((concert) => (
              <ConcertItem
                concert={concert}
                key={concert.id}
                onClick={() => navigate(endPoint.GET_CONCERT_DETAIL(concert.id))}
              />
            ))}
            <MoreIcon>
              <IoChevronDown size={24} />
            </MoreIcon>
          </ConcertList>
          <SurveyList>
            <TitleText2>차량 대절 수요 조사</TitleText2>
            <Surveys>
              {surveySearchResult.map((survey) => (
                <SurveyItem
                  endDate={survey.edDate}
                  key={survey.id}
                  participationCount={survey.participantNum}
                  region={survey.region}
                  surveyId={survey.id}
                  title={survey.title}
                />
              ))}
              <MoreIcon>
                <IoChevronDown size={24} />
              </MoreIcon>
            </Surveys>
          </SurveyList>
        </>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConcertList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem 1.6rem 2.4rem;

  svg {
    cursor: pointer;
  }
`;

const MoreIcon = styled.div`
  display: flex;
  justify-content: center;
`;

const SurveyList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem 1.6rem 2.4rem;
  gap: 2.4rem;

  svg {
    cursor: pointer;
  }
`;

const Surveys = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default Search;
