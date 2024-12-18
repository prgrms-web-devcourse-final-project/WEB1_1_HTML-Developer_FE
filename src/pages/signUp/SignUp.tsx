import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import ArtistSelector from './components/ArtistSelector';
import Email from './components/Email';
import Nickname from './components/Nickname';
import ShortBio from './components/ShortBio';

import AvatarUploader from 'components/avatarUploader/AvatarUploader';
import BaseButton from 'components/buttons/BaseButton';
import { endPoint } from 'constants/endPoint';
import { useAuthStore } from 'stores/authStore';
import { tokenAxios } from 'utils/axios';

interface ArtistRequest {
  spotifyArtistId: string;
  name: string;
}

interface SignUpFormData {
  email: string;
  nickname: string;
  introduce: string;
  loginProvider: string;
  imageUrl: string;
  imageFile?: File;
  memberArtistRequests?: ArtistRequest[];
}
const SignUp = () => {
  const location = useLocation();
  const userData = location.state;

  const methods = useForm<SignUpFormData>({
    defaultValues: {
      email: userData.email,
      nickname: '',
      introduce: '',
      loginProvider: 'KAKAO',
      imageUrl: userData.profileImageUrl,
      imageFile: undefined,
    },
  });

  const { watch } = methods;
  const email = watch('email');
  const imageUrl = watch('imageUrl');
  const { setIsLoggedIn } = useAuthStore(['setIsLoggedIn']);

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      const memberRegisterRequest = {
        email: data.email,
        nickname: data.nickname,
        introduce: null,
        loginProvider: 'KAKAO' as const,
        memberArtistRequests: [
          {
            spotifyArtistId: 'string',
            name: 'string',
          },
        ],
      };

      formData.append('memberRegisterRequest', JSON.stringify(memberRegisterRequest));

      if (data.imageFile) {
        formData.append('image', data.imageFile);
      }

      const response = await tokenAxios.post(endPoint.SIGNUP, formData);

      if (response.status === 200) {
        setIsLoggedIn();
        window.location.href = endPoint.SIGNIN;
      }
    } catch (e) {
      console.error(e);
      alert('회원가입에 실패했습니다');
    }
  });

  return (
    <FormProvider {...methods}>
      <SignUpContainer>
        <ContentWrapper>
          <AvatarUploader imageUrl={imageUrl} />
          <Nickname />
          <Email value={email} />
          <ShortBio />
          <ArtistSelector />
        </ContentWrapper>
        <BaseButton
          color="primary"
          isFullWidth={true}
          onClick={handleSubmit}
          size="medium"
          variant="fill"
        >
          가입 완료
        </BaseButton>
      </SignUpContainer>
    </FormProvider>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 2.4rem;
  background-color: #1b1d1f;
  color: ${({ theme }) => theme.colors.white};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
  margin-top: 3.8rem;
`;

export default SignUp;
