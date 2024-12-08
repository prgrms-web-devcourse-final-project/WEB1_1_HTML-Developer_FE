import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';

import ArtistSelector from './components/ArtistSelector';
import Email from './components/Email';
import Nickname from './components/Nickname';
import ShortBio from './components/ShortBio';

import AvatarUploader from 'components/avatarUploader/AvatarUploader';
import BaseButton from 'components/buttons/BaseButton';
import { endPoint } from 'constants/endPoint';
import { tokenAxios } from 'utils/axios';

const SignUp = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('accessToken');

  const methods = useForm({
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
        };
      } catch (error) {
        console.error(error);
        return {
          email: '',
          nickname: '',
          introduce: '',
          imageUrl: '',
        };
      }
    },
  });

  const { watch } = methods;
  const email = watch('email');
  const imageUrl = watch('imageUrl');

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
        <BaseButton color="primary" isFullWidth={true} size="medium" variant="fill">
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
