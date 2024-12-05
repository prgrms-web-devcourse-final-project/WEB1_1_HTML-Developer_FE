import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

import Toast from './Toast';

import BaseButton from 'components/buttons/BaseButton';
import { useToastStore } from 'stores';

const meta = {
  title: 'Toast',
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastTemplate = (args: { content: string; icon?: ReactNode }) => {
  const { addToast } = useToastStore(['addToast']);

  const handleClick = () => {
    addToast(args.content, args.icon);
  };

  return (
    <BaseButton
      color="primary"
      isFullWidth={false}
      onClick={handleClick}
      size="medium"
      variant="fill"
    >
      토스트 버튼
    </BaseButton>
  );
};

export const TextExample: Story = {
  render: () => <ToastTemplate content="입금 계좌가 복사되었습니다." />,
};
