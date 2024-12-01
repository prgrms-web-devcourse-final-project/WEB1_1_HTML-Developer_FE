import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import useScreenSize from 'hooks/useScreenSize';
import Home from 'pages/home/Home';
import SignIn from 'pages/signIn/SignIn';
import SignUp from 'pages/signUp/SignUp';
import GlobalStyle from 'styles/GlobalStyle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

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
  background-color: #1b1d1f;
`;

export default App;
