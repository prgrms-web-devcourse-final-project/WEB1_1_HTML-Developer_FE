import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getUserInfo } from 'api/userApi';
import { useAuthStore } from 'stores';

export const useGetUserInfo = () => {
  const { setUserProfile } = useAuthStore(['setUserProfile']);

  const query = useSuspenseQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
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
