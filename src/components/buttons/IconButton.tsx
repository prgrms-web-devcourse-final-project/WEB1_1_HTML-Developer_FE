import styled from '@emotion/styled';
import type { MouseEventHandler, ReactNode } from 'react';

import type { ButtonSize } from './types';

interface IconButtonStyle {
  size: ButtonSize;
}

interface IconButtonProps extends IconButtonStyle {
  children: ReactNode;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const IconButtonContainer = styled.button<IconButtonStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => (size === 'medium' ? '40px' : '28px')};
  height: ${({ size }) => (size === 'medium' ? '40px' : '28px')};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.dark[500]};
    color: ${({ theme }) => theme.colors.dark[300]};
    pointer-events: none;
  }

  svg {
    width: ${({ size }) => (size === 'medium' ? '24px' : '16px')};
    height: ${({ size }) => (size === 'medium' ? '24px' : '16px')};
  }
`;

const IconButton = ({ size, children, isDisabled, onClick }: IconButtonProps) => {
  return (
    <IconButtonContainer disabled={isDisabled} onClick={onClick} size={size}>
      {children}
    </IconButtonContainer>
  );
};

export default IconButton;
