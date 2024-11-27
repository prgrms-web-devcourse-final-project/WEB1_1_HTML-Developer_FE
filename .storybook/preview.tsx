import React from 'react';
import type { Preview } from '@storybook/react';
import { css, Global, ThemeProvider } from '@emotion/react';
import theme from '../src/styles/theme';

const GlobalStyles = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  body {
    font-family:
      'Pretendard',
      -apple-system,
      sans-serif;
  }
`;

export const decorators = [
  (Story) => (
    <div style={{ padding: '8px', height: '100vh', background: '#1B1D1F' }}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <Story />
      </ThemeProvider>
    </div>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
