import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TbMinus, TbPlus } from 'react-icons/tb';

import { BodyMediumText } from 'styles/Typography';

interface CounterProps {
  value: number;
  onChange: (newValue: number) => void;
  minCount?: number;
  maxCount?: number;
}

const counterBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
`;

const counterButton = ({ theme }: { theme: Theme }) => css`
  border: 2px solid ${theme.colors.dark[500]};
  background: none;
  color: ${theme.colors.dark[300]};
  outline: none;
  cursor: pointer;

  &:hover,
  &:active {
    color: ${theme.colors.dark[100]};
  }
`;

const CounterContainer = styled.div`
  display: flex;
`;

const DecreaseButton = styled.button`
  ${counterBox}
  ${({ theme }) => counterButton({ theme })}
  border-radius: 4px 0 0 4px;
`;

const CountDisplay = styled.div`
  ${counterBox}
  background-color: ${({ theme }) => theme.colors.dark[500]};
  color: ${({ theme }) => theme.colors.dark[100]};
`;

const IncreaseButton = styled.button`
  ${counterBox}
  ${({ theme }) => counterButton({ theme })}
  border-radius: 0 4px 4px 0;
`;

const Counter = ({ value = 1, onChange, minCount = 0, maxCount = 99 }: CounterProps) => {
  const handleDecrement = () => {
    const newValue = Math.max(minCount, value - 1);
    onChange(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(maxCount, value + 1);
    onChange(newValue);
  };

  return (
    <CounterContainer>
      <DecreaseButton onClick={handleDecrement} type="button">
        <TbMinus size={20} />
      </DecreaseButton>
      <CountDisplay>
        <BodyMediumText>{value}</BodyMediumText>
      </CountDisplay>
      <IncreaseButton onClick={handleIncrement} type="button">
        <TbPlus size={20} />
      </IncreaseButton>
    </CounterContainer>
  );
};

export default Counter;
