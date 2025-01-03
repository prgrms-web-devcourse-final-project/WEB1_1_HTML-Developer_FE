import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getUserInfo } from 'api/userApi';
import { useAuthStore } from 'stores';

export const useGetUserInfo = () => {
  const { setUserProfile } = useAuthStore(['setUserProfile']);

  const query = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (query.data) {
      setUserProfile({
        email: query.data.email,
        nickname: query.data.nickname,
        profileImageUrl: query.data.profileImageUrl,
      });
    }
  }, [query.data]);

  return query;
};
