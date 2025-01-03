import styled from '@emotion/styled';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import RecentSearch from './components/RecentSearch';

import PopularKeyword from 'components/popularKeyword/PopularKeyword';
import type { Concert } from 'pages/concert/type';

interface SearchOutlet {
  concertSearchResult: Concert[];
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
}

const Search = () => {
  const { concertSearchResult, isFocused, setIsFocused, searchValue } =
    useOutletContext<SearchOutlet>();
  const [searchHistory, setSearchHistory] = useState<string[]>(['day6', 'aespa']);

  return (
    <SearchContainer>
      {concertSearchResult.length === 0 ? (
        <>
          <RecentSearch searchHistory={searchHistory} setSearchHistory={setSearchHistory} />
          <PopularKeyword />
        </>
      ) : (
        <></>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div``;

export default Search;
