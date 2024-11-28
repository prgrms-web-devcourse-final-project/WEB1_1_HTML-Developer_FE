import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ChipText, SmallText } from 'styles/Typography';
import { hexToRgba } from 'utils/hexToRgba';

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
  background-color: ${hexToRgba(theme.colors.red, 0.2)};
  color: ${theme.colors.red};
`;

const BadgeContainer = styled.div<BadgeStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: ${({ size }) => (size === 'medium' ? '5.6rem' : '4.2rem')};
  height: ${({ size }) => (size === 'medium' ? '3.2rem' : '2.4rem')};
  padding: ${({ size }) => (size === 'medium' ? '0 1.2rem' : '0 .8rem')};
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
