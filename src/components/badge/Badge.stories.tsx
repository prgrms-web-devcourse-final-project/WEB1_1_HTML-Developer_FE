import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

const meta = {
  title: 'Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BadgeTest: Story = {
  args: {
    variant: 'square',
    size: 'small',
    color: 'gray',
    children: 'D-10',
  },
};
