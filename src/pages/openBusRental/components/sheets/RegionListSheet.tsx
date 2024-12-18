import styled from '@emotion/styled';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import type { Region } from 'constants/filterTypes';
import { REGIONS } from 'constants/filterTypes';
import { useModalStore } from 'stores';
import { BodyRegularText, TitleText2 } from 'styles/Typography';

interface RegionListSheetProps {
  onChange: (region: Region) => void;
}

const RentalFilterOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  list-style: none;
`;

const RentalFilterListItem = styled.li`
  padding: 1.2rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

const RegionListSheet = ({ onChange }: RegionListSheetProps) => {
  const { closeModal } = useModalStore(['closeModal']);

  const handleOptionClick = (option: Region) => {
    onChange(option);
    closeModal('bottomSheet', 'list');
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <TitleText2>지역</TitleText2>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <RentalFilterOptionList>
          {REGIONS.map((option) => {
            if (option !== '전체') {
              return (
                <RentalFilterListItem key={option} onClick={() => handleOptionClick(option)}>
                  <BodyRegularText>{option}</BodyRegularText>
                </RentalFilterListItem>
              );
            }
          })}
        </RentalFilterOptionList>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default RegionListSheet;
