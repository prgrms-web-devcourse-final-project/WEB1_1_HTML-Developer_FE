import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';

import Dialog from './Dialog';

import BaseButton from 'components/buttons/BaseButton';
import { useModalStore } from 'stores/useModalStore';
import { TitleText2 } from 'styles/Typography';

const meta: Meta<typeof Dialog> = {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
  },

  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  height: 100vh;
  margin: 0 auto;
  position: relative;
`;

// BasicBottomSheet
const BasicTemplate = () => {
  const { openModal } = useModalStore(['openModal']);

  return (
    <>
      <BaseButton
        color="primary"
        onClick={() => openModal('dialog', 'confirm', <DialogWrapper />)}
        size="medium"
        variant="fill"
      >
        열기
      </BaseButton>
    </>
  );
};
const DialogWrapper = () => {
  const { closeModal } = useModalStore(['closeModal']);

  return (
    <Dialog>
      <Dialog.Content>
        <TitleText2>다이얼로그에 들어갈 텍스트</TitleText2>
      </Dialog.Content>
      <Dialog.Button>
        <BaseButton
          color="primary"
          isFullWidth={false}
          onClick={() => closeModal('dialog', 'confirm')}
          size="small"
          variant="outline"
        >
          닫기
        </BaseButton>
        <BaseButton
          color="primary"
          isFullWidth={false}
          onClick={() => closeModal('dialog', 'confirm')}
          size="small"
          variant="fill"
        >
          확인
        </BaseButton>
      </Dialog.Button>
    </Dialog>
  );
};

export const Basic: Story = {
  render: () => <BasicTemplate />,
};
