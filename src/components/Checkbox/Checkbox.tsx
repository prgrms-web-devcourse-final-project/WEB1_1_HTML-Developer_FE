import styled from '@emotion/styled';
import { TbCheck } from 'react-icons/tb';

interface CheckboxProps {
  date: string;
}
const Checkbox = ({ date }: CheckboxProps) => {
  return (
    <Wrapper>
      <CheckboxContainer>
        <StyledInput id={date} name={date} type="checkbox" />
        <TbCheck size={18} />
      </CheckboxContainer>
      <StyledP>{date}</StyledP>
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  user-select: none;
`;

const CheckboxContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledInput = styled.input`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 1.5px solid gainsboro;
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

const StyledP = styled.p`
  ${({ theme }) => theme.typography.bodyR}
  color: ${({ theme }) => theme.colors.dark[100]};
`;

export default Checkbox;
