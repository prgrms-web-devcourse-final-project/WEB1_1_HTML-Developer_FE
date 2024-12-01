import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';

import BottomSheet from './BottomSheet';

import BaseButton from 'components/buttons/BaseButton';
import { useModalStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';

const meta: Meta<typeof BottomSheet> = {
  title: 'BottomSheet',
  component: BottomSheet,
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

const Title = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const ContentText = styled.p`
  margin-bottom: 1.2rem;
`;

const OptionList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const ListItem = styled.li`
  padding: 1.2rem;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

// BasicBottomSheet
const BasicTemplate = () => {
  const { openModal } = useModalStore(['openModal']);

  return (
    <>
      <BaseButton
        color="primary"
        onClick={() => openModal('bottomSheet', 'basic', <BasicBottomSheet />)}
        size="medium"
        variant="fill"
      >
        열기
      </BaseButton>
    </>
  );
};
const BasicBottomSheet = () => {
  return (
    <BottomSheet name="basic">
      <BottomSheet.Header>
        <Title>기본 바텀시트</Title>
      </BottomSheet.Header>

      <BottomSheet.Content>
        <ContentText>기본적인 헤더와 내용이 포함된 바텀시트입니다.</ContentText>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

// LongContentBottomSheet
const LongContentTemplate = () => {
  const { openModal } = useModalStore(['openModal']);

  return (
    <>
      <BaseButton
        color="primary"
        onClick={() => openModal('bottomSheet', 'longContent', <LongContentBottomSheet />)}
        size="medium"
        variant="fill"
      >
        열기
      </BaseButton>
    </>
  );
};
const LongContentBottomSheet = () => {
  return (
    <BottomSheet name="longContent">
      <BottomSheet.Header>
        <Title>스크롤 가능한 내용</Title>
      </BottomSheet.Header>

      <BottomSheet.Content>
        {Array.from({ length: 30 }).map((_, i) => (
          <ContentText key={i}>스크롤 가능한 내용 {i + 1}</ContentText>
        ))}
      </BottomSheet.Content>
    </BottomSheet>
  );
};

// WithFooterBottomSheet
const WithFooterTemplate = () => {
  const { openModal } = useModalStore(['openModal']);

  return (
    <>
      <BaseButton
        color="primary"
        onClick={() => openModal('bottomSheet', 'withFooter', <WithFooterBottomSheet />)}
        size="medium"
        variant="fill"
      >
        열기
      </BaseButton>
    </>
  );
};
const WithFooterBottomSheet = () => {
  const { closeModal } = useModalStore(['closeModal']);

  return (
    <BottomSheet name="withFooter">
      <BottomSheet.Header>
        <Title>푸터가 있는 바텀시트</Title>
      </BottomSheet.Header>

      <BottomSheet.Content>
        <ContentText>확인과 취소 버튼이 포함된 바텀시트입니다.</ContentText>
      </BottomSheet.Content>

      <BottomSheet.Footer>
        <BaseButton
          color="primary"
          onClick={() => closeModal('bottomSheet', 'withFooter')}
          size="small"
          variant="outline"
        >
          닫기
        </BaseButton>
        <BaseButton
          color="primary"
          onClick={() => closeModal('bottomSheet', 'withFooter')}
          size="small"
          variant="fill"
        >
          확인
        </BaseButton>
      </BottomSheet.Footer>
    </BottomSheet>
  );
};

// ListItemBottomSheet
const ListTemplate = () => {
  const { openModal } = useModalStore(['openModal']);

  return (
    <>
      <BaseButton
        color="primary"
        onClick={() => openModal('bottomSheet', 'list', <ListItemBottomSheet />)}
        size="medium"
        variant="fill"
      >
        열기
      </BaseButton>
    </>
  );
};
const ListItemBottomSheet = () => {
  const { closeModal } = useModalStore(['closeModal']);

  return (
    <BottomSheet name="list">
      <BottomSheet.Header>
        <Title>옵션 선택</Title>
      </BottomSheet.Header>

      <BottomSheet.Content>
        <OptionList>
          {Array.from({ length: 5 }).map((_, i) => (
            <ListItem key={i} onClick={() => closeModal('bottomSheet', 'list')}>
              <BodyRegularText>옵션 {i + 1}</BodyRegularText>
            </ListItem>
          ))}
        </OptionList>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export const Basic: Story = {
  render: () => <BasicTemplate />,
};

export const LongContent: Story = {
  render: LongContentTemplate,
};

export const WithFooter: Story = {
  render: () => <WithFooterTemplate />,
};

export const ListVariant: Story = {
  render: () => <ListTemplate />,
};
