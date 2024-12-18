import BottomSheet from 'components/bottomSheet/BottomSheet';
import { TitleText2 } from 'styles/Typography';

interface BusInfoSheetProps {
  onChange: () => void;
}

const BusInfoSheet = ({ onChange }: BusInfoSheetProps) => {
  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <TitleText2>차량 정보</TitleText2>
      </BottomSheet.Header>
      <BottomSheet.Content>차량 정보 내용</BottomSheet.Content>
    </BottomSheet>
  );
};

export default BusInfoSheet;
