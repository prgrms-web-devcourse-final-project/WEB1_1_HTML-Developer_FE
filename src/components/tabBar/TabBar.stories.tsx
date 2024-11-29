import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import TabBar from './TabBar';
import type { TabType } from './tabData';
import { tabMap } from './tabData';

const meta = {
  title: 'TabBar',
  component: TabBar,
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
`;

const Template = (args: {
  tabList: (typeof tabMap)[TabType];
  selectedTab?: (typeof tabMap)[TabType][number];
  onTabClick?: (activeTab: (typeof tabMap)[TabType][number]) => void;
}) => {
  const [activeTab, setActiveTab] = useState(args.selectedTab || '상세 정보');

  const handleActiveTab = (tab: (typeof tabMap)[TabType][number]) => {
    setActiveTab(tab);
  };

  return <TabBar onTabClick={handleActiveTab} selectedTab={activeTab} tabList={args.tabList} />;
};

export const RentalTabExample: Story = {
  args: {
    tabList: tabMap['rentalTab'],
    selectedTab: '상세 정보',
    onTabClick: () => {},
  },
  render: (args) => (
    <Container>
      <Template {...args} />
    </Container>
  ),
};

export const ConcertTabExample: Story = {
  args: {
    tabList: tabMap['concertTab'],
    selectedTab: '좌석 리뷰',
    onTabClick: () => {},
  },
  render: (args) => (
    <Container>
      <Template {...args} />
    </Container>
  ),
};

export const ReviewTabExample: Story = {
  args: {
    tabList: tabMap['reviewTab'],
    selectedTab: '공연 정보',
    onTabClick: () => {},
  },
  render: (args) => (
    <Container>
      <Template {...args} />
    </Container>
  ),
};
