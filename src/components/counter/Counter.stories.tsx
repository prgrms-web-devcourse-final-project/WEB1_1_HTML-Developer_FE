import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Counter from './Counter';

const meta = {
  title: 'Counter',
  component: Counter,
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

const CounterTemplate = (args: { minCount?: number; maxCount?: number; value: number }) => {
  const [count, setCount] = useState(args.value);
  return (
    <Counter maxCount={args.maxCount} minCount={args.minCount} onChange={setCount} value={count} />
  );
};

export const CounterExample: Story = {
  args: {
    value: 1,
    maxCount: 10,
    onChange: () => {},
  },
  render: (args) => <CounterTemplate {...args} />,
};
