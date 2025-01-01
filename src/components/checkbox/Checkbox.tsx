import styled from '@emotion/styled';
import type React from 'react';
import { TbCheck } from 'react-icons/tb';

import { BodyRegularText } from 'styles/Typography';

interface CheckboxProps {
  text: string;
  onCheck?: (text: string, checked: boolean) => void;
}

const Checkbox = ({ text, onCheck }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    onCheck?.(text, target.checked);
  };

  return (
    <CheckboxContainer>
      <InputWrapper>
        <StyledInput id={text} name={text} onChange={handleChange} type="checkbox" />
        <TbCheck size={18} />
      </InputWrapper>
      <BodyRegularText>{text}</BodyRegularText>
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  user-select: none;
  color: ${({ theme }) => theme.colors.dark[100]};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  display: block;
  appearance: none;
  width: 2rem;
  height: 2rem;
  border: 1.5px solid ${({ theme }) => theme.colors.dark[300]};
  border-radius: 0.4rem;

  & + svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.white};
    display: none;
  }

  &:checked {
    border-color: transparent;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked + svg {
    display: block;
  }
`;

export default Checkbox;
