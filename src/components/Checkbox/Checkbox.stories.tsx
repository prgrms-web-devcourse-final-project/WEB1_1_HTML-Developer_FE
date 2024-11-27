import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './Checkbox';

const meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    date: { control: 'color' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    date: '2024.09.20(금)',
  },
};
