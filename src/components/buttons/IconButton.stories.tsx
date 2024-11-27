import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { LuCamera } from 'react-icons/lu';
import { PiPencilSimpleLineBold } from 'react-icons/pi';

import IconButton from './IconButton';

const meta = {
  title: 'IconButton',
  component: IconButton,
  parameters: {
    layout: 'fullscreen',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WriteButton: Story = {
  args: {
    size: 'medium',
    children: <PiPencilSimpleLineBold />,
  },
};

export const PhotoButton: Story = {
  args: {
    size: 'small',
    children: <LuCamera />,
  },
};
