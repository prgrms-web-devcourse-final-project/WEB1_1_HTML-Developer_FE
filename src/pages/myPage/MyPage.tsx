import styled from '@emotion/styled';

import AccountStatus from './components/AccountStatus';
import ApplicationSection from './components/ApplicationSection';
import ManagementSection from './components/ManagementSection';
import UserProfile from './components/UserProfile';

import { useGetUserInfo } from 'queries/user/useGetUserInfo';

const MyPage = () => {
  const { data: userInfo } = useGetUserInfo();

  const accountInfo =
    userInfo?.bank && userInfo?.number
      ? {
          bank: userInfo.bank,
          number: userInfo.number,
        }
      : null;

  return (
    <MyPageContainer>
      <UserProfile userInfo={userInfo} />
      <AccountStatus accountInfo={accountInfo} />
      <ManagementSection />
      <ApplicationSection />
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 2.4rem;
`;

export default MyPage;
