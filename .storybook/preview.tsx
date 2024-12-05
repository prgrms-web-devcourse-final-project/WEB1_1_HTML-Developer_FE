import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { StoryFn } from '@storybook/react';
import theme from '../src/styles/theme';
import GlobalStyle from 'styles/GlobalStyle';
import ModalRenderer from 'components/modalRenderer/ModalRenderer';
import { BrowserRouter } from 'react-router-dom';
import ToastRenderer from 'components/toast/ToastRenderer';

export const decorators = [
  (Story: StoryFn) => {
    if (typeof document !== 'undefined') {
      const portalRoot = document.getElementById('portal-root') || document.createElement('div');
      portalRoot.id = 'portal-root';
      document.body.appendChild(portalRoot);
    }

    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div style={{ padding: '0.8rem' }}>
            <ModalRenderer />
            <ToastRenderer />
            <Story />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1B1D1F',
        },
      ],
    },
  },
};

export default preview;
