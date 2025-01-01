import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';

import { BodyRegularText } from 'styles/Typography';

interface RadioItemProps {
  name: string;
  value: string;
  isChecked: boolean;
  isDisabled?: boolean;
  onValueChange: (value: string) => void;
}

const RadioButtonContainer = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 1.2rem;
  color: ${({ theme }) => theme.colors.dark[100]};
`;

const RadioInput = styled.input`
  width: 2rem;
  height: 2rem;
  border: 1.5px solid ${({ theme }) => theme.colors.dark[300]};
  border-radius: 50%;
  appearance: none;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    border: 6px solid ${({ theme }) => theme.colors.primary};
  }
`;

const RadioValue = styled(BodyRegularText)<{ isDisabled: boolean }>`
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.dark[300] : theme.colors.dark[100]};
  text-decoration: ${({ isDisabled }) => (isDisabled ? 'line-through' : 'none')};
`;

const RadioItem = ({
  name,
  value,
  isChecked,
  isDisabled = false,
  onValueChange,
}: RadioItemProps) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <RadioButtonContainer>
      <RadioInput
        checked={isChecked}
        disabled={isDisabled}
        id={value}
        name={name}
        onChange={handleValueChange}
        type="radio"
        value={value}
      />
      <RadioValue isDisabled={isDisabled}>{value}</RadioValue>
    </RadioButtonContainer>
  );
};

export default RadioItem;
