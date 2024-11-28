import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import BaseButton from './BaseButton';

const meta = {
  title: 'BaseButton',
  component: BaseButton,
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    variant: 'fill',
    size: 'medium',
    color: 'primary',
    children: '버튼',
    onClick: action('click!'),
  },
};
