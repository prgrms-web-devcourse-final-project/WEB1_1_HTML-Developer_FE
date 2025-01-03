import { css } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { EmailInput, NicknameInput, IntroduceInput } from './index';

import { updateUserProfile } from 'api/userApi';
import AvatarUploader from 'components/avatarUploader/AvatarUploader';
import BaseButton from 'components/buttons/BaseButton';
import type { ProfileSchemaType } from 'schemas';
import { userProfileSchema } from 'schemas';
import type { UserInfo } from 'types';

interface EditProfileFormProps {
  userProfile: UserInfo;
}

const EditProfileForm = ({ userProfile }: EditProfileFormProps) => {
  const methods = useForm<ProfileSchemaType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: userProfile
      ? {
          email: userProfile.email,
          nickname: userProfile.nickname,
          introduce: userProfile.introduce,
          loginProvider: 'KAKAO',
          memberArtistRequests: userProfile.artists.map((artist) => ({
            spotifyArtistId: artist.artistId,
            name: artist.name,
          })),

          imageFile: undefined,
        }
      : undefined,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ProfileSchemaType) => {
      const formData = new FormData();

      const memberRegisterRequest = {
        email: data.email,
        nickname: data.nickname,
        introduce: data.introduce,
        loginProvider: data.loginProvider,
        memberArtistRequests: data.memberArtistRequests,
      };

      formData.append('memberRegisterRequest', JSON.stringify(memberRegisterRequest));

      if (data.imageFile) {
        formData.append('image', data.imageFile);
      }

      return updateUserProfile(formData);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <FormProvider {...methods}>
      <form css={contentContainer} onSubmit={onSubmit}>
        <AvatarUploader imageUrl={userProfile?.profileImageUrl || ''} />
        <NicknameInput />
        <EmailInput />
        <IntroduceInput />
        <BaseButton color="primary" size="medium" type="submit" variant="fill">
          수정
        </BaseButton>
      </form>
    </FormProvider>
  );
};
const contentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  padding: 2rem 2.4rem;
`;

export default EditProfileForm;
