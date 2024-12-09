import styled from '@emotion/styled';
import { LuAlertCircle } from 'react-icons/lu';

import { CaptionText } from 'styles/Typography';

interface ValidationMessageProps {
  message: string;
}

const Message = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.red};
`;

const ValidationMessage = ({ message }: ValidationMessageProps) => {
  return (
    <Message>
      <LuAlertCircle size={18} />
      <CaptionText>{message}</CaptionText>
    </Message>
  );
};

export default ValidationMessage;
