import styled from '@emotion/styled';

import { BodyRegularText } from 'styles/Typography';

interface RadioButtonProps {
  text: string;
}
const RadioButton = ({ text }: RadioButtonProps) => {
  return (
    <RadioButtonContainer>
      <StyledInput id={text} name={text} type="radio" />
      <StyledBodyRegularText>{text}</StyledBodyRegularText>
    </RadioButtonContainer>
  );
};

const RadioButtonContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.dark[100]};
`;

const StyledInput = styled.input`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 1.5px solid ${({ theme }) => theme.colors.dark[300]};
  border-radius: 50%;

  &:checked {
    border-color: transparent;
    border: 6px solid ${({ theme }) => theme.colors.primary};
  }
`;

const StyledBodyRegularText = styled(BodyRegularText)`
  margin: 0;
  height: 1.25rem;
`;
export default RadioButton;
