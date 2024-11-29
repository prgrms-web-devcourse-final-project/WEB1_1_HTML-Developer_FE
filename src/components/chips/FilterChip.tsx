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
  gap: 0.4rem;
  width: fit-content;
  padding: 0.8rem 1.2rem 0.8rem 1.6rem;
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
  color: ${({ theme }) => theme.colors.dark[300]};
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
