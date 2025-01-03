import EditProfileForm from './components/EditProfileForm';

import { useGetUserInfo } from 'queries/user/useGetUserInfo';

const EditProfile = () => {
  const { isLoading, data: userProfile } = useGetUserInfo();

  if (isLoading || !userProfile) return <div>로딩중..</div>;

  return <EditProfileForm userProfile={userProfile} />;
};

export default EditProfile;
