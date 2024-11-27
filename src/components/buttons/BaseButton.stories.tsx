import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import BaseButton from './BaseButton';

const meta = {
  title: 'BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'fullscreen',
  },
  args: { onClick: fn() },
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    variant: 'fill',
    size: 'medium',
    color: 'primary',
    children: '버튼',
  },
};
