import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { endPoint } from 'constants/endPoint';
import { useAuthStore } from 'stores/authStore';
import { tokenAxios } from 'utils';

interface CallbackResultResponse {
  isUser: boolean;
  email: string;
  nickname: string;
  profileImageUrl: string;
  accessToken: null | string;
  refreshToken: null | string;
}

interface CallbackRequest {
  timeStamp: string;
  code: string;
  message: string;
  result: CallbackResultResponse;
}
const Callback = () => {
  const params = new URL(document.URL).searchParams;
  const code = params.get('code');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthStore(['setIsLoggedIn']);

  const getUserKakaoInfo = async (): Promise<{ data: CallbackRequest; token: string | null }> => {
    const { data, headers } = await tokenAxios.get<CallbackRequest>(endPoint.AUTH_KAKAO, {
      params: {
        code: code,
      },
    });

    const authHeader = headers['authorization'] || headers['Authorization'];
    const token = authHeader?.replace('Bearer ', '');

    return { data, token };
  };

  const setTokenStorage = (token: string | null) => {
    if (token) {
      tokenAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn();
    }
  };

  const { mutate } = useMutation({
    mutationFn: getUserKakaoInfo,
    onSuccess: ({ data }) => {
      if (data?.result.isUser) {
        setTokenStorage(data.result.accessToken);
        navigate('/');
      } else {
        navigate('/signup', {
          state: {
            email: data.result.email,
            profileImageUrl: data.result.profileImageUrl,
          },
        });
      }
    },
  });

  useEffect(() => {
    if (code) {
      mutate();
    }
  }, [code, mutate]);

  return <div>잠시만 기다려주세요</div>;
};

export default Callback;
