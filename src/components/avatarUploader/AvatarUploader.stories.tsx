import type { Meta, StoryObj } from '@storybook/react';

import AvatarUploader from './AvatarUploader';

const meta = {
  title: 'AvatarUploader',
  component: AvatarUploader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AvatarUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
