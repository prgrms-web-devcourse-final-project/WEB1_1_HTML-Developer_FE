/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import useScreenSize from 'hooks/useScreenSize';
import GlobalStyle from 'styles/GlobalStyle';

const router = createBrowserRouter([]);

function App() {
  useScreenSize();

  return (
    <>
      <GlobalStyle />
      <div css={mobileWrapperStyle}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

const mobileWrapperStyle = (theme: Theme) => css`
  width: 100%;
  max-width: ${theme.maxWidth};
  height: calc(var(--vh, 1vh) * 100);
  margin: auto;
  position: relative;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: pink;
`;

export default App;
