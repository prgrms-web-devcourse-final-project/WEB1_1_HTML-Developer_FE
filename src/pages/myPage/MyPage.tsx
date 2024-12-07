import styled from '@emotion/styled';

import AccountStatus from './components/AccountStatus';
import ApplicationSection from './components/ApplicationSection';
import ManagementSection from './components/ManagementSection';
import UserProfile from './components/UserProfile';

const MyPage = () => {
  return (
    <MyPageContainer>
      <UserProfile />
      <AccountStatus />
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
