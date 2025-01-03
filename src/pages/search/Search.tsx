import styled from '@emotion/styled';
import { useOutletContext } from 'react-router-dom';

import PopularKeyword from 'components/popularKeyword/PopularKeyword';
import type { Concert } from 'pages/concert/type';

interface SearchOutlet {
  concertSearchResult: Concert[];
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = () => {
  const { concertSearchResult, isFocused, setIsFocused } = useOutletContext<SearchOutlet>();

  return (
    <SearchContainer>
      {concertSearchResult.length === 0 ? <PopularKeyword /> : <></>}
    </SearchContainer>
  );
};

const SearchContainer = styled.div``;

export default Search;
