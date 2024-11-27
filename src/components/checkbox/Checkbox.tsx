import styled from '@emotion/styled';
import { TbCheck } from 'react-icons/tb';

import { BodyRegularText } from 'styles/Typography';

interface CheckboxProps {
  text: string;
}
const Checkbox = ({ text }: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <InputWrapper>
        <StyledInput id={text} name={text} type="checkbox" />
        <TbCheck size={18} />
      </InputWrapper>
      <BodyRegularText>{text}</BodyRegularText>
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  user-select: none;
  color: ${({ theme }) => theme.colors.dark[100]};
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledInput = styled.input`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 1.5px solid ${({ theme }) => theme.colors.dark[300]};
  border-radius: 0.25rem;

  & + svg {
    position: absolute;
    top: 40%;
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
