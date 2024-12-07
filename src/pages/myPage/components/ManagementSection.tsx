import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BiBus } from 'react-icons/bi';
import { TbClipboardText } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import { TitleText2, BodyMediumText } from 'styles/Typography';

const ManagementSection = () => {
  return (
    <div css={container}>
      <TitleText2>내 관리</TitleText2>

      <div css={buttonContainer}>
        <MenuLink to="/survey-management">
          <TbClipboardText size={24} />
          <BodyMediumText>수요 조사 관리</BodyMediumText>
        </MenuLink>

        <MenuLink to="/rental-management">
          <BiBus size={24} />
          <BodyMediumText>차량 대절 관리</BodyMediumText>
        </MenuLink>
      </div>
    </div>
  );
};

const container = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const buttonContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 1.6rem 1.2rem;
  text-decoration: none;
  color: white;
  background: ${({ theme }) => theme.colors.dark[700]};
  border-radius: 8px;
  transition: background-color 0.2s;

  &:active {
    background-color: ${({ theme }) => theme.colors.dark[500]};
  }
`;

export default ManagementSection;
