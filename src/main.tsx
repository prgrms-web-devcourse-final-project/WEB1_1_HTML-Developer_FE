import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import theme from 'styles/theme';

const queryClient = new QueryClient();
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') return;

  const { worker } = await import('./mocks/browser');

  return worker.start();
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error('Error enabling mocking:', error);
  });
