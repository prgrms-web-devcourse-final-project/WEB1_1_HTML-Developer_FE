import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetSeatReviews } from 'api';
import { useAuthStore } from 'stores';
import type { SeatReview, SeatReviewParams, SeatReviewSort } from 'types';

export const useGetSeatReviews = (hallId: string, sortType: SeatReviewSort) => {
  const { isLoggedIn } = useAuthStore(['isLoggedIn']);

  const fetchSeatReviews = async (params: SeatReviewParams) => {
    if (!isLoggedIn) return [];

    const { lastId, lastCreatedAt } = params;
    const query = `${lastId && lastCreatedAt ? `lastId=${lastId}&lastCreatedAt=${lastCreatedAt}&` : ''}size=3&sortType=${sortType}&hallId=${hallId}`;

    const { data } = await requestGetSeatReviews(query);
    return data.result;
  };

  return useInfiniteQuery<SeatReview[]>({
    queryKey: ['seatReviews', hallId, sortType],
    queryFn: ({ pageParam }) => fetchSeatReviews(pageParam as SeatReviewParams),
    initialPageParam: { lastId: null, lastCreatedAt: null },
    getNextPageParam: (lastPage) => {
      const lastData = lastPage[lastPage.length - 1];
      return lastPage.length > 0
        ? { lastId: lastData.reviewId, lastCreatedAt: lastData.createdAt }
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};
