import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { publicAxios, tokenAxios } from 'utils';

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

  const getUserKakaoInfo = async (): Promise<CallbackRequest> => {
    const { data } = await tokenAxios.get<CallbackRequest>('/auth/token/kakao', {
      params: {
        code: code,
      },
    });
    return data;
  };

  const { data } = useQuery({
    queryKey: ['kakaoLogin', code],
    queryFn: getUserKakaoInfo,
  });

  useEffect(() => {
    if (data) {
      console.log('응답 data', data);
    }
  }, [data]);

  return <div>잠시만 기다려주세요</div>;
};

export default Callback;
