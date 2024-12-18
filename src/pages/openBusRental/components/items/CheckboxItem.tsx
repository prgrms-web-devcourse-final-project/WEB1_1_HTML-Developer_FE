import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { TbCheck } from 'react-icons/tb';

import { BodyRegularText } from 'styles/Typography';

interface CheckboxItemProps {
  name: string;
  value: string;
  isChecked: boolean;
  onClick: (value: string) => void;
}

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: ${({ theme }) => theme.colors.dark[100]};
  user-select: none;
  cursor: pointer;
`;

const BoxWrapper = styled.div`
  position: relative;
`;

const CheckboxInput = styled.input`
  display: block;
  width: 2rem;
  height: 2rem;
  border: 1.5px solid ${({ theme }) => theme.colors.dark[300]};
  border-radius: 4px;
  appearance: none;

  & + svg {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.white};
  }

  &:checked {
    border-color: transparent;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked + svg {
    display: block;
  }

  &:hover,
  &:active {
    border-color: ${({ theme }) => theme.colors.dark[200]};

    &:checked {
      border-color: transparent;
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

const CheckboxItem = ({ name, value, isChecked, onClick }: CheckboxItemProps) => {
  const handleCheckboxClick = (e: ChangeEvent<HTMLInputElement>) => {
    onClick(e.target.value);
  };

  return (
    <CheckboxContainer>
      <BoxWrapper>
        <CheckboxInput
          checked={isChecked}
          id={value}
          name={name}
          onChange={handleCheckboxClick}
          type="checkbox"
        />
        <TbCheck size={18} />
      </BoxWrapper>
      <BodyRegularText>{value}</BodyRegularText>
    </CheckboxContainer>
  );
};

export default CheckboxItem;
