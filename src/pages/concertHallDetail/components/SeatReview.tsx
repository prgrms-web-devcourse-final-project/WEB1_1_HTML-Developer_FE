import styled from '@emotion/styled';
import { useState } from 'react';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import SeatReviewItem from './SeatReviewItem';

import { useIntersectionObserver } from 'hooks';
import { useGetSeatReviews } from 'queries/concertHall/useGetSeatReviews';
import { useAuthStore } from 'stores';
import { BodyRegularText, CaptionText } from 'styles/Typography';
import type { SeatReview, SeatReviewSort } from 'types';

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

const EmptySeatReview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  padding: 8rem 0;
`;

const SeatReviewList = styled.ul`
  list-style: none;
`;

const SeatReview = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuthStore(['isLoggedIn']);
  const [sortOrder, setSortOrder] = useState<SeatReviewSort>('CREATED_AT');
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSeatReviews(id as string, sortOrder);

  const targetRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  });

  if (!isLoggedIn) {
    return (
      <EmptySeatReview>
        <IoChatbubbleEllipses size={80} />
        <BodyRegularText>로그인하고 리뷰를 확인해보세요</BodyRegularText>
      </EmptySeatReview>
    );
  }

  return (
    <SeatReviewContainer>
      <ReviewFilterWrapper>
        <ReviewFilter
          isActive={sortOrder === 'CREATED_AT'}
          onClick={() => setSortOrder('CREATED_AT')}
        >
          ∙ 최신순
        </ReviewFilter>
        <ReviewFilter
          isActive={sortOrder === 'LIKE_COUNT'}
          onClick={() => setSortOrder('LIKE_COUNT')}
        >
          ∙ 오래된순
        </ReviewFilter>
      </ReviewFilterWrapper>
      {reviews?.pages[0].length === 0 ? (
        <EmptySeatReview>
          <IoChatbubbleEllipses size={80} />
          <BodyRegularText>아직 작성된 리뷰가 없어요</BodyRegularText>
        </EmptySeatReview>
      ) : (
        reviews?.pages.map((page, pageIndex) => (
          <SeatReviewList key={pageIndex}>
            {page.map((item) => (
              <SeatReviewItem key={item.reviewId} {...item} />
            ))}
          </SeatReviewList>
        ))
      )}
      <div ref={targetRef} />
    </SeatReviewContainer>
  );
};

export default SeatReview;
