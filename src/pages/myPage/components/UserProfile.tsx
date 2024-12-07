import styled from '@emotion/styled';

import BaseButton from 'components/buttons/BaseButton';
import { CaptionText, TitleText2 } from 'styles/Typography';

const UserProfile = () => {
  return (
    <UserProfileWrapper>
      <ProfileSection>
        <ProfileImage>
          <img alt="profile_image" src="src/assets/react.svg" />
        </ProfileImage>
        <UserInfo>
          <TitleText2>닉네임</TitleText2>
          <CaptionText>한 줄 소개가 들어갈 자리</CaptionText>
        </UserInfo>
      </ProfileSection>
      <BaseButton color="dark" size="medium" to="/edit-profile" variant="fill">
        프로필 편집
      </BaseButton>
    </UserProfileWrapper>
  );
};

const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2.8rem;
`;

const ProfileImage = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.dark[100]};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  span {
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

export default UserProfile;
