import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SearchInput from './SearchInput';

const meta = {
  title: 'SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'fullscreen',
  },

  argTypes: {
    text: { control: 'text' },
    isActive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: '공연을 입력해주세요',
    isActive: true,
    onSearch: fn(),
  },
};
