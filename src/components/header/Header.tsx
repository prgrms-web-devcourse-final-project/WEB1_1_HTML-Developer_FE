import styled from '@emotion/styled';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import logoTitle from 'assets/logoTitle.svg';
import { TitleText2 } from 'styles/Typography';

/**
 * @TODO path 경로 수정
 */
const Header = () => {
  return (
    <HeaderContainer>
      <StyledLink to="/">
        <img alt="logoTitle" src={logoTitle} />
      </StyledLink>
      <Wrapper>
        <StyledLink to="/search">
          <IoSearch size={24} />
        </StyledLink>
        <StyledLink to="/login">
          <TitleText2>로그인</TitleText2>
        </StyledLink>
      </Wrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 360px;
  height: 52px;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark[500]};

  img {
    width: 110px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.colors.white};
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

export default Header;
