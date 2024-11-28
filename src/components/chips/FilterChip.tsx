import styled from '@emotion/styled';
import type { MouseEventHandler } from 'react';
import { TbChevronDown } from 'react-icons/tb';

import { ChipText } from 'styles/Typography';

interface ChipStyle {
  isActive: boolean;
}

interface FilterChipProps extends ChipStyle {
  children: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const ChipContainer = styled.div<ChipStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: auto;
  padding: 8px 12px 8px 16px;
  border: 1px solid
    ${({ isActive, theme }) => (isActive ? theme.colors.primaryLight : theme.colors.dark[300])};
  border-radius: 24px;
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primaryLight : theme.colors.dark[300]};
  cursor: pointer;

  &:hover,
  &:active {
    border-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const DropdownButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.dark[300]};
  cursor: pointer;
`;

const FilterChip = ({ isActive = false, children, onClick }: FilterChipProps) => {
  return (
    <ChipContainer aria-pressed={isActive} isActive={isActive} onClick={onClick} role="button">
      <ChipText>{children}</ChipText>
      <DropdownButton aria-label="dropdown">
        <TbChevronDown size={20} />
      </DropdownButton>
    </ChipContainer>
  );
};

export default FilterChip;
