import type { Meta, StoryObj } from '@storybook/react';

import SignIn from './SignIn';

const meta = {
  title: 'Pages/SignIn',
  component: SignIn,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DarkMode: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
