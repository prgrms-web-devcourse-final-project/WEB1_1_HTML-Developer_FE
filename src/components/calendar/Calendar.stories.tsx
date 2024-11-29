import type { Meta, StoryObj } from '@storybook/react';

import CustomDatePicker from './Calendar';

const meta = {
  title: 'Calendar',
  component: CustomDatePicker,
  parameters: {
    layout: 'fullscreen',
  },

  decorators: [(Story) => <Story />],
} satisfies Meta<typeof CustomDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
