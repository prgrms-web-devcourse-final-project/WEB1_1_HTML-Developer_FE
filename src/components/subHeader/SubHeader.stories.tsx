import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import SubHeader from './SubHeader';

const meta = {
  title: 'SubHeader',
  component: SubHeader,
  parameters: {
    layout: 'fullscreen',
  },

  argTypes: {
    text: { control: 'text' },
  },

  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SubHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: '리뷰 작성',
  },
};
