import BottomSheet from 'components/bottomSheet/BottomSheet';
import { TitleText2 } from 'styles/Typography';

interface EndDateSheetProps {
  onChange: () => void;
}

const EndDateSheet = ({ onChange }: EndDateSheetProps) => {
  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <TitleText2>모집 마감 날짜</TitleText2>
      </BottomSheet.Header>
      <BottomSheet.Content>마감 날짜 내용</BottomSheet.Content>
    </BottomSheet>
  );
};

export default EndDateSheet;
