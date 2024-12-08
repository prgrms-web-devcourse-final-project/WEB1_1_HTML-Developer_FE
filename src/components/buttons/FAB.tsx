import styled from '@emotion/styled';
import type { MouseEventHandler } from 'react';
import { PiPencilSimpleLineBold } from 'react-icons/pi';

import IconButton from './IconButton';

interface FABProps {
  onFABClick: MouseEventHandler<HTMLButtonElement>;
}

const FABContainer = styled.aside`
  position: fixed;
  inset: 0;
  z-index: 100;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

const FABWrapper = styled.div`
  position: absolute;
  bottom: 8.2rem;
  right: 2.4rem;
`;

const FAB = ({ onFABClick }: FABProps) => {
  return (
    <FABContainer>
      <FABWrapper>
        <IconButton isDisabled={false} onClick={onFABClick} size="medium">
          <PiPencilSimpleLineBold size={20} />
        </IconButton>
      </FABWrapper>
    </FABContainer>
  );
};

export default FAB;
