import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PiPencilSimpleBold } from 'react-icons/pi';
import { TbTrash } from 'react-icons/tb';

import BottomSheet from 'components/bottomSheet/BottomSheet';
import { useModalStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';

const ActionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  list-style: none;
`;

const ActionItemStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${theme.colors.dark[500]};
  }
`;

const EditActionItem = styled.li`
  ${({ theme }) => ActionItemStyle(theme)}
`;

const DeleteActionItem = styled.li`
  ${({ theme }) => ActionItemStyle(theme)}
  color: ${({ theme }) => theme.colors.red};
`;

const SeatReviewSheet = () => {
  const { closeModal } = useModalStore(['closeModal']);

  const handleOptionClick = () => {
    closeModal('bottomSheet', 'list');
  };

  return (
    <BottomSheet name="list">
      <BottomSheet.Content>
        <ActionList>
          <EditActionItem onClick={handleOptionClick}>
            <PiPencilSimpleBold size={20} />
            <BodyRegularText>리뷰 수정</BodyRegularText>
          </EditActionItem>
          <DeleteActionItem onClick={handleOptionClick}>
            <TbTrash size={20} />
            <BodyRegularText>리뷰 삭제</BodyRegularText>
          </DeleteActionItem>
        </ActionList>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default SeatReviewSheet;
