import styled from '@emotion/styled';
import { TbChevronLeft, TbShare2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { TitleText2 } from 'styles/Typography';

interface SubHeaderProps {
  text: string;
  isSharePage?: boolean;
  isTransparent?: boolean;
}
const SubHeader = ({ text, isSharePage = false, isTransparent = false }: SubHeaderProps) => {
  const navigate = useNavigate();

  return (
    <SubHeaderContainer isTransparent={isTransparent}>
      <TbChevronLeft onClick={() => navigate(-1)} size={24} />
      <TitleText2>{text}</TitleText2>
      {isSharePage && <TbShare2 size={24} />}
    </SubHeaderContainer>
  );
};

const SubHeaderContainer = styled.div<{ isTransparent: boolean }>`
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  align-items: center;
  position: fixed;
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
  height: 5.2rem;
  padding: 0 1.6rem;
  white-space: nowrap;
  user-select: none;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ isTransparent, theme }) =>
    isTransparent ? 'transparent' : theme.colors.dark[700]};
  text-align: center;

  svg {
    cursor: pointer;
  }
`;

export default SubHeader;
