import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ChipText, SmallText } from 'styles/Typography';

type BadgeVariant = 'square' | 'round';
type BadgeSize = 'small' | 'medium';
type BadgeColor = 'gray' | 'red';

interface BadgeStyle {
  variant: BadgeVariant;
  size: BadgeSize;
  color: BadgeColor;
}

interface BadgeProps extends BadgeStyle {
  children: string;
}

const GrayStyle = (theme: Theme) => css`
  background-color: ${theme.colors.dark[500]};
  color: ${theme.colors.white};
`;

const RedStyle = (theme: Theme) => css`
  background-color: ${theme.colors.redBg};
  color: ${theme.colors.red};
`;

const BadgeContainer = styled.div<BadgeStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: ${({ size }) => (size === 'medium' ? '56px' : '42px')};
  height: ${({ size }) => (size === 'medium' ? '32px' : '24px')};
  padding: ${({ size }) => (size === 'medium' ? '0 12px' : '0 8px')};
  border-radius: ${({ variant }) => (variant === 'round' ? '24px' : '4px')};

  ${({ color, theme }) => (color === 'gray' ? GrayStyle(theme) : RedStyle(theme))}
`;

const Badge = ({ variant, size, color, children }: BadgeProps) => {
  return (
    <BadgeContainer color={color} size={size} variant={variant}>
      {size === 'medium' ? <ChipText>{children}</ChipText> : <SmallText>{children}</SmallText>}
    </BadgeContainer>
  );
};

export default Badge;
