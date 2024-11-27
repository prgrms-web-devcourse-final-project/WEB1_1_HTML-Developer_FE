import type { Meta, StoryObj } from '@storybook/react';

import SimpleChip from './SimpleChip';

const meta = {
  title: 'SimpleChip',
  component: SimpleChip,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SimpleChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chip: Story = {
  args: {
    children: 'DAY6',
  },
};

export const ChipWithButton: Story = {
  args: {
    children: 'DAY6',
    onDeleteClick: () => {},
  },
};
