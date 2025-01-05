import styled from '@emotion/styled';
import { IoChevronDown } from 'react-icons/io5';
import { useNavigate, useOutletContext } from 'react-router-dom';

import RecentSearch from './components/RecentSearch';

import PopularKeyword from 'components/popularKeyword/PopularKeyword';
import { endPoint } from 'constants/endPoint';
import type { RentsResult, SurveysResult } from 'layout/SearchLayout';
import RentalPostItem from 'pages/busRental/components/RentalPostItem';
import ConcertItem from 'pages/concert/components/ConcertItem';
import type { Concert } from 'pages/concert/type';
import SurveyItem from 'pages/surveys/components/SurveyItem';
import { TitleText2 } from 'styles/Typography';

interface SearchOutlet {
  concertSearchResult: Concert[];
  surveySearchResult: SurveysResult[];
  rentsSearchResult: RentsResult[];
  searchValue: string;
}

const Search = () => {
  const { concertSearchResult, surveySearchResult, rentsSearchResult, searchValue } =
    useOutletContext<SearchOutlet>();
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
              <IoChevronDown
                onClick={() =>
                  navigate(`/search/concerts/more?keyword=${encodeURIComponent(searchValue)}`)
                }
                size={24}
              />
            </MoreIcon>
          </ConcertList>
          <RentsList>
            <TitleText2>콘서트 차량 대절</TitleText2>
            {rentsSearchResult.map((rent) => (
              <RentalPostItem
                boardingArea={rent.boardingArea}
                endDate={rent.edDate}
                imageUrl={rent.imageUrl}
                rentId={rent.id}
                title={rent.title}
              />
            ))}
            <MoreIcon>
              <IoChevronDown
                onClick={() =>
                  navigate(`/search/rents/more?keyword=${encodeURIComponent(searchValue)}`)
                }
                size={24}
              />
            </MoreIcon>
          </RentsList>
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
                <IoChevronDown
                  onClick={() =>
                    navigate(`/search/surveys/more?keyword=${encodeURIComponent(searchValue)}`)
                  }
                  size={24}
                />
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

const RentsList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem 1.6rem 2.4rem;
  gap: 2.4rem;

  svg {
    cursor: pointer;
  }
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
