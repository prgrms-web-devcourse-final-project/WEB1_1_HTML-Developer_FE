import styled from '@emotion/styled';
import type { MouseEventHandler } from 'react';
import { TbChevronDown } from 'react-icons/tb';

import { BodyRegularText } from 'styles/Typography';

interface SelectProps {
  value: string;
  children?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Select = ({ value, children = '선택해주세요', onClick }: SelectProps) => {
  return (
    <SelectContainer hasValue={!!value}>
      <BodyRegularText>{value || children}</BodyRegularText>
      <TbChevronDown size={24} />
    </SelectContainer>
  );
};

const SelectContainer = styled.div<{ hasValue: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 320px;
  height: 2.5rem;
  border-radius: 0.25rem;
  padding: 0 0.75rem 0 1rem;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme, hasValue }) => (hasValue ? theme.colors.white : theme.colors.dark[300])};
  cursor: pointer;
  user-select: none;
`;

export default Select;
