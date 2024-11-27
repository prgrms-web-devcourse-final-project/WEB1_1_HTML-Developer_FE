import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Select from './Select';

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    onClick: fn(),
    children: { control: 'text' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: '서울',
  },
};
