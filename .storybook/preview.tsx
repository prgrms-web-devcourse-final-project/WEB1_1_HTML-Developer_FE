import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { StoryFn } from '@storybook/react';
import theme from '../src/styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

export const decorators = [
  (Story: StoryFn) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div
        style={{
          padding: '0.8rem',
        }}
      >
        <Story />
      </div>
    </ThemeProvider>
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
