import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Counter from './Counter';

const meta = {
  title: 'Counter',
  component: Counter,
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

const CounterWrapper = (args: { value: number }) => {
  const [count, setCount] = useState(args.value);
  return <Counter onChange={setCount} value={count} />;
};

export const CounterExample: Story = {
  args: {
    value: 1,
    onChange: () => {},
  },
  render: (args) => <CounterWrapper {...args} />,
};
