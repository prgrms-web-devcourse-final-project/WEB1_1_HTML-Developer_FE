import styled from '@emotion/styled';
import { TbChevronLeft, TbShare2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { TitleText2 } from 'styles/Typography';

interface SubHeaderProps {
  text: string;
}
const SubHeader = ({ text }: SubHeaderProps) => {
  const navigate = useNavigate();

  return (
    <SubHeaderContainer>
      <TbChevronLeft onClick={() => navigate(-1)} size={24} />
      <TitleText2>{text}</TitleText2>
      <TbShare2 size={24} />
    </SubHeaderContainer>
  );
};

const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5.2rem;
  padding: 0 1.6rem;
  white-space: nowrap;
  user-select: none;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

export default SubHeader;
