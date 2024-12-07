import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';

import ArtistSelector from './components/ArtistSelector';
import Email from './components/Email';
import Nickname from './components/Nickname';
import ShortBio from './components/ShortBio';

import AvatarUploader from 'components/avatarUploader/AvatarUploader';
import BaseButton from 'components/buttons/BaseButton';
import SubHeader from 'components/subHeader/SubHeader';

const SignUp = () => {
  const methods = useForm({
    defaultValues: {
      nickname: '',
      introduce: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <SignUpContainer>
        <ContentWrapper>
          <AvatarUploader />
          <Nickname />
          <Email />
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
