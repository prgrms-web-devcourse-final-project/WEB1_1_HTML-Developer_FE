import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BiBus } from 'react-icons/bi';
import { TbClipboardText } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import { TitleText2, BodyMediumText } from 'styles/Typography';

const ApplicationSection = () => {
  return (
    <div css={container}>
      <TitleText2>내 관리</TitleText2>

      <div css={buttonContainer}>
        <MenuLink to="/my-survey-list">
          <TbClipboardText size={24} />
          <BodyMediumText>참여 중인 수요 조사</BodyMediumText>
        </MenuLink>

        <MenuLink to="/my-rental-list">
          <BiBus size={24} />
          <BodyMediumText>참여 중인 차량 대절</BodyMediumText>
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

export default ApplicationSection;
