import styled from '@emotion/styled';
import { IoChevronDown } from 'react-icons/io5';
import { useNavigate, useOutletContext } from 'react-router-dom';

import RecentSearch from './components/RecentSearch';

import PopularKeyword from 'components/popularKeyword/PopularKeyword';
import { endPoint } from 'constants/endPoint';
import ConcertItem from 'pages/concert/components/ConcertItem';
import type { Concert } from 'pages/concert/type';
import { TitleText2 } from 'styles/Typography';

interface SearchOutlet {
  concertSearchResult: Concert[];
}

const Search = () => {
  const { concertSearchResult } = useOutletContext<SearchOutlet>();
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

export default Search;
