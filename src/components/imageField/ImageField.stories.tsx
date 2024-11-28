import type { Meta, StoryObj } from '@storybook/react';

import ImageField from './ImageField';

const meta: Meta<typeof ImageField> = {
  title: 'ImageField',
  component: ImageField,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ImageField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageFieldTest: Story = {};
