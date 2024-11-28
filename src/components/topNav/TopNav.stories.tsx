import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import TopNav from './TopNav';

const meta = {
  title: 'TopNav',
  component: TopNav,
  parameters: {
    layout: 'fullscreen',
  },

  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
