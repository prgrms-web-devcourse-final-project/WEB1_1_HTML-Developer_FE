import styled from '@emotion/styled';
import { useState, type MouseEventHandler } from 'react';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';

import { BodyRegularText } from 'styles/Typography';

interface SelectProps {
  value?: string;
  children?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Select = ({ value, children = '선택해주세요', onClick }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsOpen(!isOpen);
    onClick?.(e);
  };
  return (
    <SelectContainer hasValue={!!value} onClick={handleClick}>
      <BodyRegularText>{value || children}</BodyRegularText>
      {isOpen ? <TbChevronUp size={24} /> : <TbChevronDown size={24} />}
    </SelectContainer>
  );
};

const SelectContainer = styled.div<{ hasValue: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  min-width: 32.7rem;
  height: 4rem;
  border-radius: 0.4rem;
  padding: 0 1.2rem 0 1.6rem;
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme, hasValue }) => (hasValue ? theme.colors.white : theme.colors.dark[300])};
  cursor: pointer;
  user-select: none;
`;

export default Select;
