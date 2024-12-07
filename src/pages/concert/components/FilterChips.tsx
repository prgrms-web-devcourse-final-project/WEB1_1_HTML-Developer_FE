import styled from '@emotion/styled';

import { sortValue } from './ListItem';
import type { FilterCategory } from '../type';

import FilterChip from 'components/chips/FilterChip';

interface FilterChipsProps {
  selectedRegion: string;
  selectedDirection: string;
  handleModalOpen: (title: FilterCategory, handler: (value: string) => void) => void;
  handleRegionSelect: (value: string) => void;
  handleDirectionSelect: (value: string) => void;
}

const FilterChips = ({
  selectedRegion,
  selectedDirection,
  handleModalOpen,
  handleRegionSelect,
  handleDirectionSelect,
}: FilterChipsProps) => {
  return (
    <Wrapper>
      <FilterChip isActive={false} onClick={() => handleModalOpen('지역', handleRegionSelect)}>
        {selectedRegion}
      </FilterChip>
      <FilterChip isActive={false} onClick={() => handleModalOpen('정렬', handleDirectionSelect)}>
        {sortValue[selectedDirection as keyof typeof sortValue]}
      </FilterChip>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 2.4rem 2.4rem 0 2.4rem;
`;

export default FilterChips;
