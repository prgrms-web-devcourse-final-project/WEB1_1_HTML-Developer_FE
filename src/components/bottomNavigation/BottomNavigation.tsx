import styled from '@emotion/styled';
import { useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { LuUser2 } from 'react-icons/lu';
import { TbMessageCircle, TbBell } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import type { BottomNavIcons, BottomNavKey } from './types';

import { ChipText } from 'styles/Typography';

const BottomNavigation = () => {
  const [selectedIcon, setSelectedIcon] = useState<BottomNavKey>('홈');
  const navigate = useNavigate();
  /**
   * @TODO path 경로 수정
   */
  const bottomNavIcons: BottomNavIcons = {
    홈: {
      icon: <BiHomeAlt size={20} />,
      path: '/',
    },
    채팅: {
      icon: <TbMessageCircle size={20} />,
      path: '/chat',
    },
    알림: {
      icon: <TbBell size={20} />,
      path: '/notification',
    },
    마이페이지: {
      icon: <LuUser2 size={20} />,
      path: '/mypage',
    },
  };

  const handleClick = (key: BottomNavKey) => {
    setSelectedIcon(key);
    navigate(bottomNavIcons[key].path);
  };

  return (
    <BottomNavigationContainer>
      {Object.entries(bottomNavIcons).map(([key, { icon }]) => (
        <IconWrapper
          isSelected={selectedIcon === key}
          key={key}
          onClick={() => handleClick(key as BottomNavKey)}
        >
          {icon}
          <ChipText>{key}</ChipText>
        </IconWrapper>
      ))}
    </BottomNavigationContainer>
  );
};

const BottomNavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3.62rem;
  padding: 0.5rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

const IconWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 2px;
  padding: 0 22px;
  flex-shrink: 0;
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.dark[300])};

  &:hover {
    cursor: pointer;
  }
`;

export default BottomNavigation;
