import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../src/styles/theme';

export const decorators = [
  (Story) => (
    <div style={{ padding: '8px', height: '100vh', background: '#1B1D1F' }}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </div>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
