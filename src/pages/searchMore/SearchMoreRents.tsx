import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import type { GetMoreProps, Param, RentResult } from './type';

import { endPoint } from 'constants/endPoint';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import RentalPostItem from 'pages/busRental/components/RentalPostItem';
import { TitleText2 } from 'styles/Typography';
import { publicAxios } from 'utils';

const SearchMoreRents = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const PAGE_SIZE = 7;

  const getMoreRents = async ({ keyword, searchAfter }: GetMoreProps) => {
    const params: Record<string, string | number> = {
      query: keyword,
      pageSize: PAGE_SIZE,
    };

    if (searchAfter) {
      params.searchAfter1 = searchAfter[0];
      params.searchAfter2 = searchAfter[1];
    }

    return await publicAxios.get(endPoint.GET_MORE_RENTS_LIST, { params });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<RentResult>({
      queryKey: ['search-concerts', keyword],
      queryFn: async ({ pageParam }) => {
        const {
          data: { result },
        } = await getMoreRents({ keyword, searchAfter: pageParam as Param });
        return result;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        return lastPage.searchAfter || undefined;
      },
    });

  const handleObserver = () => {
    if (hasNextPage && !isFetchingNextPage) {
      if (hasNextPage) {
        void fetchNextPage();
      }
    }
  };

  const targetRef = useIntersectionObserver(handleObserver);

  if (isLoading) {
    return (
      <SearchMoreRentsContainer>
        <TitleText2>콘서트 차량 대절</TitleText2>
        <div>로딩 중...</div>
      </SearchMoreRentsContainer>
    );
  }

  return (
    <SearchMoreRentsContainer>
      <TitleText2>콘서트 차량 대절</TitleText2>
      {data?.pages?.map((page) =>
        page?.rentThumbnails?.map((rent) => (
          <RentalPostItem
            boardingArea={rent.boardingArea}
            endDate={rent.edDate}
            imageUrl={rent.imageUrl}
            key={rent.id}
            rentId={rent.id}
            title={rent.title}
          />
        ))
      )}
      <div ref={targetRef} />
    </SearchMoreRentsContainer>
  );
};

const SearchMoreRentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7rem 2.4rem;
`;

export default SearchMoreRents;
