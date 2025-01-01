import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import type { tabMap, TabType } from './tabData';

import { BodyMediumText } from 'styles/Typography';

interface TabBarProps {
  tabList: (typeof tabMap)[TabType];
  selectedTab?: (typeof tabMap)[TabType][number];
  onTabClick?: (activeTab: (typeof tabMap)[TabType][number]) => void;
  isInactive?: boolean;
}

interface TabItemStyle {
  isActive: boolean;
}

const TabBarContainer = styled.div<{ isInactive?: boolean }>`
  display: flex;
  position: relative;
  width: 100%;
  padding: 0 2.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark[500]};
  pointer-events: ${({ isInactive }) => (isInactive ? 'none' : 'auto')};
`;

const TabItem = styled(motion.button)<TabItemStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1.2rem 1.6rem;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.dark[50] : theme.colors.dark[500])};
`;

const Slider = styled(motion.div)`
  position: absolute;
  bottom: 0;
  height: 1px;
  background: ${({ theme }) => theme.colors.dark[50]};
`;

const TabBar = ({ tabList, selectedTab, onTabClick, isInactive }: TabBarProps) => {
  const [slider, setSlider] = useState({ left: 0, width: 0 });
  const tabItemRef = useRef<Map<string, HTMLButtonElement | null>>(new Map());
  const tabBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedTab || !tabBarRef.current) return;

    const target = tabItemRef.current.get(selectedTab);
    if (target) {
      const parentRect = tabBarRef.current.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      setSlider({
        left: targetRect.left - parentRect.left,
        width: targetRect.width,
      });
    }
  }, [selectedTab]);

  return (
    <TabBarContainer isInactive={isInactive} ref={tabBarRef}>
      {tabList.map((tab) => (
        <TabItem
          isActive={tab === selectedTab}
          key={tab}
          onClick={() => onTabClick?.(tab)}
          ref={(el) => tabItemRef.current.set(tab, el)}
        >
          <BodyMediumText>{tab}</BodyMediumText>
        </TabItem>
      ))}
      <Slider
        animate={{ left: slider.left, width: slider.width }}
        initial={false}
        style={{
          left: slider.left,
          width: slider.width,
        }}
        transition={{ duration: 0.2 }}
      />
    </TabBarContainer>
  );
};

export default TabBar;
