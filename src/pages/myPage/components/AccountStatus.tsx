import styled from '@emotion/styled';
import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { LuAlertCircle } from 'react-icons/lu';

import RefundBottomSheet from './RefundBottomSheet';

import BaseButton from 'components/buttons/BaseButton';
import { useModalStore } from 'stores';
import { MediumButtonText, TitleText2, CaptionText, BodyMediumText } from 'styles/Typography';
import type { RefundAccountInfo } from 'types';

const EmptyAccount = () => {
  const { openModal } = useModalStore(['openModal']);

  const handleAccountBS = () => {
    openModal('bottomSheet', 'refundAccount', <RefundBottomSheet />);
  };

  return (
    <EmptyAccountWrapper>
      <EmptyLogoWrapper>
        <LuAlertCircle size={36} />
      </EmptyLogoWrapper>
      <TitleText2>등록된 환불 계좌가 없습니다</TitleText2>
      <BaseButton color="primary" onClick={handleAccountBS} size="medium" variant="fill">
        <ButtonTextWrapper>
          <FiPlusCircle size={24} />
          <MediumButtonText>계좌 등록</MediumButtonText>
        </ButtonTextWrapper>
      </BaseButton>
    </EmptyAccountWrapper>
  );
};

const RegisteredAccountView = ({ accountInfo }: { accountInfo: RefundAccountInfo }) => {
  const { openModal } = useModalStore(['openModal']);

  const handleAccountBS = () => {
    openModal('bottomSheet', 'refundAccount', <RefundBottomSheet accountInfo={accountInfo} />);
  };

  return (
    <AccountInfoWrapper onClick={handleAccountBS}>
      <AccountInfoContent>
        <AccountDetails>
          <BankName>
            <CaptionText>{accountInfo.bank}</CaptionText>
          </BankName>
          <AccountNumber>
            <BodyMediumText>{accountInfo.accountNumber}</BodyMediumText>
          </AccountNumber>
        </AccountDetails>
      </AccountInfoContent>
    </AccountInfoWrapper>
  );
};

const AccountStatus = () => {
  const [accountInfo, setAccountInfo] = useState<RefundAccountInfo | null>(
    null
    // {
    //   bank: '신한은행',
    //   accountNumber: '123-456-789',
    // }
  );

  return (
    <AccountWrapper>
      {accountInfo ? <RegisteredAccountView accountInfo={accountInfo} /> : <EmptyAccount />}
    </AccountWrapper>
  );
};

const AccountWrapper = styled.div`
  width: 100%;
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};
  border-radius: 16px;
`;

const EmptyAccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const EmptyLogoWrapper = styled.div`
  padding: 1.4rem;
  background-color: ${({ theme }) => theme.colors.dark[200]};
  border-radius: 99999px;
  svg {
    color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

const ButtonTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const AccountInfoWrapper = styled.div`
  cursor: pointer;
  width: 100%;
`;

const AccountInfoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const BankName = styled.span`
  color: ${({ theme }) => theme.colors.dark[200]};
`;

const AccountNumber = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;

export default AccountStatus;
