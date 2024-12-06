import styled from '@emotion/styled';

import logo from 'assets/Logo.svg';
import mainLogoTitle from 'assets/mainLogoTitle.svg';
import { MediumButtonText } from 'styles/Typography';

const SignIn = () => {
  const kakaoURL = `${import.meta.env.VITE_API_URL}/oauth2/login/kakao`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <SignInContainer>
      <LogoWrapper>
        <img alt="mainLogo" src={mainLogoTitle} />
        <img alt="logo" src={logo} />
      </LogoWrapper>
      <ButtonWrapper>
        <KaKaoBtn onClick={handleLogin}>
          <MediumButtonText>카카오톡으로 시작하기</MediumButtonText>
        </KaKaoBtn>
        <GoogleBtn onClick={handleLogin}>
          <MediumButtonText>구글로 시작하기</MediumButtonText>
        </GoogleBtn>
      </ButtonWrapper>
    </SignInContainer>
  );
};

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 2.4rem;
  gap: 1.4rem;
  background-color: #1b1d1f;

  img {
    width: 18rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-top: 10rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.7rem;
  margin-top: 14rem;

  button {
    width: 100%;
    height: 5.4rem;
    border-radius: 1.2rem;
    color: rgba(24, 22, 22, 0.7);
  }
`;

const KaKaoBtn = styled.button`
  background-color: #f7e569;
`;

const GoogleBtn = styled.button`
  background-color: #f4f3ed;
`;
export default SignIn;
