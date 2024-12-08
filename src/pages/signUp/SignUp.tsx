import styled from '@emotion/styled';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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
  imageUrl: string;
  imageFile?: File;
  memberArtistRequests?: ArtistRequest[];
}
const SignUp = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('accessToken');
  const { setToken, setIsLoggedIn } = useAuthStore();

  const setTokenStorage = (token: string) => {
    localStorage.setItem('accessToken', token);
    tokenAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setToken(token);
  };

  const methods = useForm<SignUpFormData>({
    defaultValues: async () => {
      try {
        const { data } = await tokenAxios.get(endPoint.GET_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return {
          email: data.result.email,
          nickname: '',
          introduce: '',
          imageUrl: data.result.profileImageUrl,
          imageFile: undefined,
        };
      } catch (error) {
        console.error(error);
        return {
          email: '',
          nickname: '',
          introduce: '',
          imageUrl: '',
          imageFile: undefined,
        };
      }
    },
  });

  const { watch } = methods;
  const email = watch('email');
  const imageUrl = watch('imageUrl');

  useEffect(() => {
    if (token) {
      setTokenStorage(token);
    }
  }, [token]);

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      const memberInfoRequest = {
        nickname: data.nickname,
        introduce: null,
        memberArtistRequests: [
          {
            spotifyArtistId: 'string',
            name: 'string',
          },
        ],
      };

      formData.append('memberInfoRequest', JSON.stringify(memberInfoRequest));

      if (data.imageFile) {
        formData.append('image', data.imageFile);
      }

      const response = await tokenAxios.post(endPoint.SIGNUP, formData);

      if (response.status === 200) {
        setIsLoggedIn();
        window.location.href = '/auth-success';
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
