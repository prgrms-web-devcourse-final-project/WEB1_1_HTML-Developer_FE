import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { MouseEventHandler } from 'react';

import type { ButtonColor, ButtonSize, ButtonVariant } from './types';

import { MediumButtonText } from 'styles/Typography';

interface BaseButtonColor {
  color: ButtonColor;
}

interface BaseButtonStyle extends BaseButtonColor {
  variant: ButtonVariant;
  size: ButtonSize;
  isFullWidth?: boolean;
}

interface BaseButtonProps extends BaseButtonStyle {
  children: string;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
}

const FilledStyle = ({ color, theme }: BaseButtonColor & { theme: Theme }) => css`
  border: none;
  background-color: ${color === 'primary' ? theme.colors.primary : theme.colors.dark[500]};
  color: ${theme.colors.white};

  &:active {
    background-color: ${color === 'primary' ? theme.colors.primaryDark : theme.colors.dark[700]};
  }

  &:disabled {
    background-color: ${color === 'primary' ? theme.colors.dark[500] : theme.colors.dark[700]};
    color: ${theme.colors.dark[300]};
  }
`;

const OutlineStyle = ({ color, theme }: BaseButtonColor & { theme: Theme }) => css`
  border: 1px solid ${color === 'primary' ? theme.colors.primary : theme.colors.dark[500]};
  background-color: transparent;
  color: ${color === 'primary' ? theme.colors.primary : theme.colors.dark[300]};

  &:active {
    border-color: ${color === 'primary' ? theme.colors.primaryDark : theme.colors.dark[300]};
    color: ${color === 'primary' ? theme.colors.primaryDark : theme.colors.dark[200]};
  }

  &:disabled {
    border-color: ${theme.colors.dark[500]};
    color: ${theme.colors.dark[500]};
  }
`;

const BaseButtonContainer = styled.button<BaseButtonStyle>`
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
  min-width: 8.8rem;
  height: ${({ size }) => (size === 'medium' ? '4.8rem' : '4rem')};
  padding: 0 1.2rem;
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  ${({ variant, color, theme }) =>
    variant === 'fill' ? FilledStyle({ color, theme }) : OutlineStyle({ color, theme })}

  &:disabled {
    pointer-events: none;
  }
`;

const BaseButton = ({
  variant,
  size,
  color,
  children,
  isDisabled,
  onClick,
  isFullWidth = true,
  type = 'button',
}: BaseButtonProps) => {
  return (
    <BaseButtonContainer
      color={color}
      disabled={isDisabled}
      isFullWidth={isFullWidth}
      onClick={onClick}
      size={size}
      type={type}
      variant={variant}
    >
      <MediumButtonText>{children}</MediumButtonText>
    </BaseButtonContainer>
  );
};

export default BaseButton;
