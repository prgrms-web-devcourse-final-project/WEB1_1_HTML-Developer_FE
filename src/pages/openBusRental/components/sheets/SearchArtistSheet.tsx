import BottomSheet from 'components/bottomSheet/BottomSheet';

interface SearchArtistSheetProps {
  onClick: () => void;
}

const SearchArtistSheet = ({ onClick }: SearchArtistSheetProps) => {
  return (
    <BottomSheet name="list">
      <BottomSheet.Content>아티스트 검색</BottomSheet.Content>
    </BottomSheet>
  );
};

export default SearchArtistSheet;
