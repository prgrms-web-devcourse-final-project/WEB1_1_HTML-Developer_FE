import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import FilterChip from './FilterChip';

const meta = {
  title: 'FilterChip',
  component: FilterChip,
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chip: Story = {
  args: {
    children: '지역',
    onClick: action('click'),
    isActive: false,
  },
};

export const ChipWithButton: Story = {
  args: {
    children: '천안',
    onClick: action('click'),
    isActive: true,
  },
};
