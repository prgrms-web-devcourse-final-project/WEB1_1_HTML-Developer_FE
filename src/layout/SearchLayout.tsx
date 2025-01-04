import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { TbChevronLeft } from 'react-icons/tb';
import { Outlet, useNavigate } from 'react-router-dom';

import SearchInput from 'components/searchInput/SearchInput';
import { endPoint } from 'constants/endPoint';
import type { Concert } from 'pages/concert/type';
import type { ConcertResponse } from 'pages/openSurvey/type';
import { publicAxios } from 'utils';

const SearchLayout = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [concertSearchResult, setConcertSearchResult] = useState<Concert[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem('searchHistory');

    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const searchInputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getConcert = async (keyword: string) => {
    const {
      data: { result },
    } = await publicAxios.get<ConcertResponse>(
      `${endPoint.GET_CONCERT_SEARCH}/?query=${encodeURIComponent(keyword)}`
    );

    return result;
  };

  const handleConcertSearch = async (keyword: string) => {
    if (!keyword.trim()) return;

    const result = await getConcert(keyword);
    setConcertSearchResult(result);

    setSearchHistory((prev) => {
      if (prev.includes(keyword)) {
        return [keyword, ...prev.filter((item) => item != keyword)];
      }

      return [keyword, ...prev];
    });
  };

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <>
      <HeaderContainer>
        <TbChevronLeft onClick={() => navigate(-1)} size={24} />
        <SearchWrapper onClick={() => setIsFocused(true)} ref={searchInputRef}>
          <SearchInput
            isActive={isFocused}
            onSearch={handleConcertSearch}
            text="검색어를 입력해주세요"
          />
        </SearchWrapper>
      </HeaderContainer>
      <Outlet context={{ concertSearchResult, searchHistory, setSearchHistory }} />
    </>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 1.6rem 2.4rem 2.6rem 2.4rem;

  svg {
    cursor: pointer;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
`;

export default SearchLayout;
