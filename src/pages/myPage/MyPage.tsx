import styled from '@emotion/styled';

import AccountStatus from './components/AccountStatus';
import ManagementSection from './components/ManagementSection';
import UserProfile from './components/UserProfile';

const MyPage = () => {
  return (
    <MyPageContainer>
      <UserProfile />
      <AccountStatus />
      <ManagementSection />
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  padding: 2.4rem;
`;

export default MyPage;
