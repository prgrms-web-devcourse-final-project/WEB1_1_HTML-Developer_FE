import { Global, css } from '@emotion/react';
import type { Theme } from '@emotion/react';

const globalStyle = (theme: Theme) => css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

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
    font-size: 62.5%;
    color: ${theme.colors.white};
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
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
