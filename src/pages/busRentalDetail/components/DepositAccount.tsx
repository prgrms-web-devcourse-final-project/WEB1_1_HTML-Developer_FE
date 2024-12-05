import styled from '@emotion/styled';
import { TbCopy } from 'react-icons/tb';

import { BodyRegularText } from 'styles/Typography';

interface DepositAccountProps {
  depositAccount: string | null;
}

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  padding: 1.2rem 1.6rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const AccountCopyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.dark[200]};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Blur = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  width: 100%;
  border-radius: 8px;
  backdrop-filter: blur(6px);
  color: ${({ theme }) => theme.backdrop};
`;

const DepositAccount = ({ depositAccount }: DepositAccountProps) => {
  return (
    <AccountWrapper>
      {depositAccount ? (
        <>
          <BodyRegularText>{depositAccount}</BodyRegularText>
          <AccountCopyButton onClick={() => {}}>
            <TbCopy size={20} />
          </AccountCopyButton>
        </>
      ) : (
        <>
          <Blur>
            <BodyRegularText>로그인 후 확인하실 수 있습니다.</BodyRegularText>
          </Blur>
          <BodyRegularText>올리은행 012345678910112</BodyRegularText>
        </>
      )}
    </AccountWrapper>
  );
};

export default DepositAccount;
