/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const globalStyle = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:
      'Pretendard',
      -apple-system,
      sans-serif;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

const GlobalStyle = () => {
  return <Global styles={globalStyle} />;
};

export default GlobalStyle;
