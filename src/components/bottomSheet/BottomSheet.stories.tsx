import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';

import BottomSheet from './BottomSheet';

import { useBottomSheetStore } from 'stores/useBottomSheetStore';

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

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const ContentText = styled.p`
  margin-bottom: 1rem;
`;

const FooterButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;

  ${({ variant }) =>
    variant === 'primary'
      ? `
    background-color: #3b82f6;
    color: white;
    &:hover {
      background-color: #2563eb;
    }
  `
      : `
    background-color: #e5e7eb;
    color: #1f2937;
    &:hover {
      background-color: #d1d5db;
    }
  `}
`;

const ListItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

const BasicTemplate = () => {
  const { openBottomSheet } = useBottomSheetStore(['openBottomSheet']);

  return (
    <>
      <Button onClick={openBottomSheet}>Open Basic Bottom Sheet</Button>

      <BottomSheet>
        <BottomSheet.Header>
          <Title>Basic Bottom Sheet</Title>
        </BottomSheet.Header>
        <BottomSheet.Content>
          <ContentText>This is a basic bottom sheet with header and content.</ContentText>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

const LongContentTemplate = () => {
  const { openBottomSheet } = useBottomSheetStore(['openBottomSheet']);

  return (
    <>
      <Button onClick={openBottomSheet}>Open Long Content</Button>

      <BottomSheet>
        <BottomSheet.Header>
          <Title>Scrollable Content</Title>
        </BottomSheet.Header>
        <BottomSheet.Content>
          {Array.from({ length: 20 }).map((_, i) => (
            <ContentText key={i}>
              Scrollable content paragraph {i + 1}. This is a longer text to demonstrate how the
              bottom sheet handles overflow content with scrolling.
            </ContentText>
          ))}
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

const WithFooterTemplate = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheetStore([
    'openBottomSheet',
    'closeBottomSheet',
  ]);

  return (
    <>
      <Button onClick={openBottomSheet}>Open With Footer</Button>

      <BottomSheet>
        <BottomSheet.Header>
          <Title>Bottom Sheet with Footer</Title>
        </BottomSheet.Header>
        <BottomSheet.Content>
          <ContentText>
            This bottom sheet includes footer buttons for common actions like confirm and cancel.
          </ContentText>
        </BottomSheet.Content>
        <BottomSheet.Footer>
          <FooterButton onClick={closeBottomSheet} variant="secondary">
            Cancel
          </FooterButton>
          <FooterButton onClick={closeBottomSheet} variant="primary">
            Confirm
          </FooterButton>
        </BottomSheet.Footer>
      </BottomSheet>
    </>
  );
};

const ListTemplate = () => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheetStore([
    'openBottomSheet',
    'closeBottomSheet',
  ]);

  return (
    <>
      <Button onClick={openBottomSheet}>Open List Bottom Sheet</Button>

      <BottomSheet>
        <BottomSheet.Header>
          <Title>Select an Option</Title>
        </BottomSheet.Header>
        <BottomSheet.Content>
          {Array.from({ length: 5 }).map((_, i) => (
            <ListItem key={i} onClick={closeBottomSheet}>
              Option {i + 1}
            </ListItem>
          ))}
        </BottomSheet.Content>
      </BottomSheet>
    </>
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
