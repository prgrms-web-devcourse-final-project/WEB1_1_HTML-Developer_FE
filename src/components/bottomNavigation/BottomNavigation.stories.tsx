import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import BottomNavigation from './BottomNavigation';

const meta = {
  title: 'BottomNavigation',
  component: BottomNavigation,
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
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
