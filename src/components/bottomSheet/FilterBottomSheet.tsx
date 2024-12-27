import styled from '@emotion/styled';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import { FILTER_NAME } from 'constants/filterTypes';
import { useModalStore, useFilterStore } from 'stores';
import { BodyRegularText, TitleText2 } from 'styles/Typography';
import type { FilterOptionsMap, FilterType } from 'types';

interface FilterBottomSheetProps {
  filterType: FilterType;
  target: 'survey' | 'rental';
}

const FilterBottomSheet = ({ filterType, target }: FilterBottomSheetProps) => {
  const { closeModal } = useModalStore(['closeModal']);
  const { updateFilter } = useFilterStore(['updateFilter']);

  const handleOptionClick = <T extends FilterType>(filterType: T, option: FilterOptionsMap[T]) => {
    updateFilter(target === 'rental' ? 'rentalFilters' : 'surveyFilters', filterType, option);
    closeModal('bottomSheet', 'list');
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <TitleText2>{FILTER_NAME[filterType].name}</TitleText2>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <FilterOptionList>
          {FILTER_NAME[filterType].options.map((option) => (
            <FilterListItem key={option} onClick={() => handleOptionClick(filterType, option)}>
              <BodyRegularText>{option}</BodyRegularText>
            </FilterListItem>
          ))}
        </FilterOptionList>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

const FilterOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  list-style: none;
`;

const FilterListItem = styled.li`
  padding: 1.2rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

export default FilterBottomSheet;
