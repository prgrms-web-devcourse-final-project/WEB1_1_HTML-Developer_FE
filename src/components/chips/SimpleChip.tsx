import styled from '@emotion/styled';
import type { MouseEventHandler } from 'react';
import { TbX } from 'react-icons/tb';

import { ChipText } from 'styles/Typography';

interface ChipStyle {
  hasDeleteIcon?: boolean;
}

interface SimpleChipProps extends ChipStyle {
  children: string;
  onDeleteClick?: MouseEventHandler<HTMLButtonElement>;
}

const ChipContainer = styled.div<ChipStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  padding: ${({ hasDeleteIcon }) => (hasDeleteIcon ? '.8rem 1.2rem .8rem 1.6rem' : '.8rem 1.6rem')};
  border: 1px solid ${({ theme }) => theme.colors.dark[500]};
  border-radius: 24px;
  color: ${({ theme }) => theme.colors.dark[300]};
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.dark[300]};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[100]};
  }
`;

const SimpleChip = ({ hasDeleteIcon = false, children, onDeleteClick }: SimpleChipProps) => {
  return (
    <ChipContainer hasDeleteIcon={hasDeleteIcon}>
      <ChipText>{children}</ChipText>
      {hasDeleteIcon && (
        <DeleteButton aria-label="delete" onClick={onDeleteClick}>
          <TbX size={18} />
        </DeleteButton>
      )}
    </ChipContainer>
  );
};

export default SimpleChip;
