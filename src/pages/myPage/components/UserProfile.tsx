import styled from '@emotion/styled';
import { FaUser } from 'react-icons/fa6';

import BaseButton from 'components/buttons/BaseButton';
import { CaptionText, TitleText1 } from 'styles/Typography';
import type { UserInfo } from 'types';

interface UserProfileProps {
  userInfo?: UserInfo;
}

const UserProfile = ({ userInfo }: UserProfileProps) => {
  return (
    <UserProfileWrapper>
      <ProfileSection>
        <ProfileImage>
          {userInfo?.profileImageUrl ? (
            <img alt="profile_image" src={userInfo.profileImageUrl} />
          ) : (
            <FaUser size={32} />
          )}
        </ProfileImage>
        <UserInfo>
          <TitleText1>{userInfo?.nickname}</TitleText1>
          <CaptionText>{userInfo?.introduce || '한 줄 소개를 입력해주세요'}</CaptionText>
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.dark[100]};
  overflow: hidden;
  color: ${({ theme }) => theme.colors.dark[300]};

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
