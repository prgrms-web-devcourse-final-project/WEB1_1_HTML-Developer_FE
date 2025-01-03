import styled from '@emotion/styled';
import type React from 'react';

import SimpleChip from 'components/chips/SimpleChip';
import { CaptionText, TitleText2 } from 'styles/Typography';

interface RecentSearchProps {
  searchHistory: string[];
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const RecentSearch = ({ searchHistory, setSearchHistory }: RecentSearchProps) => {
  const handleHistoryDelete = () => {
    setSearchHistory([]);
  };

  const handleKeywordDelete = (keyword: string) => {
    setSearchHistory(searchHistory.filter((item) => item !== keyword));
  };

  return (
    <RecentSearchContainer>
      <Header>
        <TitleText2>최근 검색어</TitleText2>
        <CaptionText onClick={handleHistoryDelete}>검색 기록 전체 삭제</CaptionText>
      </Header>
      <SearchResult>
        {searchHistory.length > 0 &&
          searchHistory.map((item) => (
            <SimpleChip
              hasDeleteIcon={true}
              key={item}
              onDeleteClick={() => handleKeywordDelete(item)}
            >
              {item}
            </SimpleChip>
          ))}
      </SearchResult>
    </RecentSearchContainer>
  );
};

const RecentSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding: 0 2.4rem 2rem 2.4rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.dark[50]};

    &:hover {
      color: ${({ theme }) => theme.colors.dark[100]};
    }
  }
`;

const SearchResult = styled.div`
  display: flex;
  gap: 1rem;
`;

export default RecentSearch;
