import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { TbChevronLeft } from 'react-icons/tb';
import { Outlet } from 'react-router-dom';

import SearchInput from 'components/searchInput/SearchInput';
import { endPoint } from 'constants/endPoint';
import type { Concert } from 'pages/concert/type';
import type { ConcertResponse } from 'pages/openSurvey/type';
import { publicAxios } from 'utils';

const SearchLayout = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLDivElement>(null);
  const [concertSearchResult, setConcertSearchResult] = useState<Concert[]>([]);

  const getConcert = async (keyword: string) => {
    const {
      data: { result },
    } = await publicAxios.get<ConcertResponse>(
      `${endPoint.GET_CONCERT_SEARCH}/?query=${encodeURIComponent(keyword)}`
    );

    return result;
  };

  const handleConcertSearch = async (keyword: string) => {
    const result = await getConcert(keyword);
    setConcertSearchResult(result);
  };

  return (
    <>
      <HeaderContainer>
        <TbChevronLeft size={24} />
        <SearchWrapper ref={searchInputRef}>
          <SearchInput
            isActive={isFocused}
            onSearch={handleConcertSearch}
            text="검색어를 입력해주세요"
          />
        </SearchWrapper>
      </HeaderContainer>
      <Outlet context={{ concertSearchResult, isFocused, setIsFocused }} />
    </>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 1.6rem 2.4rem 2.6rem 2.4rem;
`;

const SearchWrapper = styled.div`
  width: 100%;
`;

export default SearchLayout;
