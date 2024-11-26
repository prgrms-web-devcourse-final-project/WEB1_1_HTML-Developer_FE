import { ThemeProvider } from '@emotion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import theme from 'styles/theme';

createRoot(document.getElementById('root')!).render(
  <>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StrictMode>
  </>
);
