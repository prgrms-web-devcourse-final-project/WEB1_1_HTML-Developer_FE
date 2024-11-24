import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import './index.css';
import App from './App';

import GlobalStyle from 'styles/globalStyle';

createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <StrictMode>
      <App />
    </StrictMode>
  </>
);
