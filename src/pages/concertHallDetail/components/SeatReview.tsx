import styled from '@emotion/styled';
import { useState } from 'react';

import SeatReviewItem from './SeatReviewItem';

import { CaptionText } from 'styles/Typography';

const SeatReviewContainer = styled.div``;

const ReviewFilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  padding: 0 2.4rem;
`;

const ReviewFilter = styled(CaptionText)<{ isActive?: boolean }>`
  color: ${({ theme, isActive }) => (isActive ? theme.colors.dark[100] : theme.colors.dark[500])};
  cursor: pointer;
`;

const SeatReview = () => {
  const [sortOrder, setSortOrder] = useState('latest');

  return (
    <SeatReviewContainer>
      <ReviewFilterWrapper>
        <ReviewFilter isActive={sortOrder === 'latest'} onClick={() => setSortOrder('latest')}>
          ∙ 최신순
        </ReviewFilter>
        <ReviewFilter isActive={sortOrder === 'oldest'} onClick={() => setSortOrder('oldest')}>
          ∙ 오래된순
        </ReviewFilter>
      </ReviewFilterWrapper>
      <SeatReviewItem />
    </SeatReviewContainer>
  );
};

export default SeatReview;
