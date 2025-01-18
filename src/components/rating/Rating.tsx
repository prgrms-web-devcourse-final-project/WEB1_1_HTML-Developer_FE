import styled from '@emotion/styled';
import { TbStarFilled } from 'react-icons/tb';

interface RatingProps {
  score: number;
}

const RatingContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const StarIcon = styled(TbStarFilled)<{ isFilled: boolean }>`
  color: ${({ theme, isFilled }) => (isFilled ? theme.colors.primary : theme.colors.dark[500])};
`;

const Rating = ({ score }: RatingProps) => {
  const filledStars = Math.floor(score);

  return (
    <RatingContainer>
      {Array.from({ length: 5 }).map((_, idx) => (
        <StarIcon isFilled={idx < filledStars} size={16} />
      ))}
    </RatingContainer>
  );
};

export default Rating;
