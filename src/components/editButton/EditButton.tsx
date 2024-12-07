import styled from '@emotion/styled';
import { PiPencilSimple } from 'react-icons/pi';
import { TbTrash } from 'react-icons/tb';

import { BodyRegularText } from 'styles/Typography';

interface EditButtonProps {
  buttonText: string;
}

interface ButtonWithIconStyle {
  isRed?: boolean;
}

const EditButton = ({ buttonText }: EditButtonProps) => {
  return (
    <ButtonWrapper>
      <ButtonWithIcon>
        <PiPencilSimple size={24} />
        <BodyRegularText>{buttonText} 수정</BodyRegularText>
      </ButtonWithIcon>
      <ButtonWithIcon isRed>
        <TbTrash size={24} strokeWidth={1.5} />
        <BodyRegularText>{buttonText} 삭제</BodyRegularText>
      </ButtonWithIcon>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
`;

const ButtonWithIcon = styled.button<ButtonWithIconStyle>`
  display: flex;
  align-items: center;
  color: ${({ theme, isRed = false }) => (isRed ? theme.colors.red : theme.colors.white)};
  gap: 1.2rem;
  width: 100%;
  padding: 1.2rem;

  svg {
    color: ${({ theme, isRed = false }) => (isRed ? theme.colors.red : theme.colors.white)};
  }
`;

export default EditButton;
