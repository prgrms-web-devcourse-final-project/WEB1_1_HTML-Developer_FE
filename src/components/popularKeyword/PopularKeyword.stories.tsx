import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PopularKeyword from './PopularKeyword';

const queryClient = new QueryClient();

const meta = {
  title: 'PopularKeyword',
  component: PopularKeyword,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof PopularKeyword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
