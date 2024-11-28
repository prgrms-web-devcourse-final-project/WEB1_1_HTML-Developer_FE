import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { LuCamera } from 'react-icons/lu';
import { PiPencilSimpleLineBold } from 'react-icons/pi';

import IconButton from './IconButton';

const meta = {
  title: 'IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WriteButton: Story = {
  args: {
    size: 'medium',
    children: <PiPencilSimpleLineBold />,
    onClick: action('click!'),
  },
};

export const PhotoButton: Story = {
  args: {
    size: 'small',
    children: <LuCamera />,
    onClick: action('click!'),
  },
};
