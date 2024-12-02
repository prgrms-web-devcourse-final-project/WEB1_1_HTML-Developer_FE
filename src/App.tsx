import styled from '@emotion/styled';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import useScreenSize from 'hooks/useScreenSize';
import { router } from 'routes/routes';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  useScreenSize();

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<div>loading...</div>}>
        <MobileWrapper>
          <RouterProvider router={router} />
        </MobileWrapper>
      </Suspense>
    </>
  );
}

const MobileWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  min-height: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.black};

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
