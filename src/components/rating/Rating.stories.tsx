import type { Meta, StoryObj } from '@storybook/react';

import Rating from './Rating';

const meta = {
  title: 'Rating',
  component: Rating,
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RatingExample: Story = {
  args: {
    score: 4.5,
  },
};
