import styled from '@emotion/styled';

import FilterChip from 'components/chips/FilterChip';

interface FilterChipsProps {
  selectedAddress: string;
  selectedSeatScale: number;
  handleAddressSelect: (value: string) => void;
  handleSeatScaleSelect: (value: number) => void;
  handleModalOpen: <T extends string | number>(title: string, handler: (value: T) => void) => void;
}

const FilterChips = ({
  handleAddressSelect,
  handleSeatScaleSelect,
  selectedAddress,
  selectedSeatScale,
  handleModalOpen,
}: FilterChipsProps) => {
  return (
    <Container>
      <FilterChip isActive={false} onClick={() => handleModalOpen('지역', handleAddressSelect)}>
        {selectedAddress}
      </FilterChip>
      <FilterChip isActive={false} onClick={() => handleModalOpen('좌석수', handleSeatScaleSelect)}>
        {selectedSeatScale === 0
          ? '좌석 규모'
          : selectedSeatScale.toLocaleString().toString() + '석 이상'}
      </FilterChip>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 12px;
`;

export default FilterChips;
