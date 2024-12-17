import BottomSheet from 'components/bottomSheet/BottomSheet';

interface SearchConcertSheetProps {
  onClick: () => void;
}

const SearchConcertSheet = ({ onClick }: SearchConcertSheetProps) => {
  return (
    <BottomSheet name="list">
      <BottomSheet.Content>공연 검색</BottomSheet.Content>
    </BottomSheet>
  );
};

export default SearchConcertSheet;
