import styled from '@emotion/styled';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import { DATE_SORT_ARRAY, REGIONS } from 'constants/filterTypes';
import { useModalStore } from 'stores';
import { useRentalFilterStore } from 'stores/useRentalFilterStore';
import { BodyRegularText, TitleText2 } from 'styles/Typography';
import type { RentalFilterOptions, RentalFilterType, RentalFilterValue } from 'types';

interface RentalFiltersProps {
  filterType: RentalFilterType;
}

interface RentalFilters {
  name: string;
  options: RentalFilterOptions;
}

const RENTAL_FILTER_NAME: Record<RentalFilterType, RentalFilters> = {
  region: { name: '지역', options: REGIONS },
  sort: { name: '정렬', options: DATE_SORT_ARRAY },
};

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

const RentalFilterSheet = ({ filterType }: RentalFiltersProps) => {
  const { closeModal } = useModalStore(['closeModal']);
  const { updateFilterActive } = useRentalFilterStore(['updateFilterActive']);

  const handleOptionClick = (filterType: RentalFilterType, option: RentalFilterValue) => {
    updateFilterActive(filterType, option);
    closeModal('bottomSheet', 'list');
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <TitleText2>{RENTAL_FILTER_NAME[filterType].name}</TitleText2>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <RentalFilterOptionList>
          {RENTAL_FILTER_NAME[filterType].options.map((option) => (
            <RentalFilterListItem
              key={option}
              onClick={() => handleOptionClick(filterType, option)}
            >
              <BodyRegularText>{option}</BodyRegularText>
            </RentalFilterListItem>
          ))}
        </RentalFilterOptionList>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default RentalFilterSheet;
