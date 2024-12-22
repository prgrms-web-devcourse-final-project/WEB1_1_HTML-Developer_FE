import styled from '@emotion/styled';
import { useState } from 'react';

import SearchArtistItem from '../items/SearchArtistItem';

import Magnifier from 'assets/images/magnifier-icon.svg?react';
import BottomSheet from 'components/bottomSheet/BottomSheet';
import SearchInput from 'components/searchInput/SearchInput';
import { SEARCH_PLACEHOLDER } from 'constants/placeholder';
import { useGetSearchArtist } from 'queries/rentForm/useGetSearchArtist';
import { useModalStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';

interface SearchArtistSheetProps {
  onArtistSelect?: (artistName: string) => void;
}

const SheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SearchResultContainer = styled.div<{ isError?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isError }) => (isError ? 'center' : 'flex-start')};
  align-items: ${({ isError }) => (isError ? 'center' : 'flex-start')};
  gap: ${({ isError }) => (isError ? '2.4rem' : '0')};
  min-height: 32rem;
`;

const SearchIcon = styled(Magnifier)`
  width: 5.2rem;
  height: 5.2rem;
`;

const EmptyText = styled(BodyRegularText)`
  line-height: 1.8;
  text-align: center;
  white-space: pre-line;
`;

const SearchArtistSheet = ({ onArtistSelect }: SearchArtistSheetProps) => {
  const { closeModal } = useModalStore(['closeModal']);
  const [searches, setSearches] = useState<string | null>('');
  const { data: artists, isError } = useGetSearchArtist(searches);

  const handleArtistSelect = (artistName: string) => {
    onArtistSelect?.(artistName);
    closeModal('bottomSheet', 'list');
  };

  const handleSearchClear = () => setSearches('');

  return (
    <BottomSheet name="list">
      <BottomSheet.Content>
        <SheetContainer>
          <SearchInput
            isActive
            onClear={handleSearchClear}
            onSearch={setSearches}
            onValueChange={() => setSearches(null)}
            text={SEARCH_PLACEHOLDER.artist}
          />
          <SearchResultContainer isError={isError}>
            {isError ? (
              <>
                <SearchIcon />
                <EmptyText>{`검색 결과가 없습니다. \n 정확한 아티스트명을 입력해주세요.`}</EmptyText>
              </>
            ) : (
              artists?.map((artist) => (
                <SearchArtistItem
                  artistImg={artist.images[2].url}
                  artistName={artist.name}
                  key={artist.id}
                  onClick={(artist) => handleArtistSelect(artist)}
                />
              ))
            )}
          </SearchResultContainer>
        </SheetContainer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default SearchArtistSheet;
