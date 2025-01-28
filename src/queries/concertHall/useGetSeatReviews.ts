import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetSeatReviews } from 'api';
import { useAuthStore } from 'stores';
import type { SeatReview, SeatReviewSort } from 'types';

export const useGetSeatReviews = (hallId: string, sortType: SeatReviewSort) => {
  const { isLoggedIn } = useAuthStore(['isLoggedIn']);

  const fetchSeatReviews = async (lastId: number | null) => {
    if (!isLoggedIn) return [];

    const query = `${lastId ? `lastId=${lastId}&` : ''}size=3&sortType=${sortType}&hallId=${hallId}`;
    const { data } = await requestGetSeatReviews(query);
    return data.result;
  };

  return useInfiniteQuery<SeatReview[]>({
    queryKey: ['seatReviews', hallId, sortType],
    queryFn: ({ pageParam }) => {
      const param = pageParam as number | null;
      return fetchSeatReviews(param);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const lastData = lastPage[lastPage.length - 1];
      return lastPage.length > 0 ? lastData.reviewId : null;
    },
  });
};
