import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { ConcertResult, GetMoreProps, Param } from './type';

import { endPoint } from 'constants/endPoint';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import ConcertItem from 'pages/concert/components/ConcertItem';
import { TitleText2 } from 'styles/Typography';
import { publicAxios } from 'utils';

const SearchMoreConcerts = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const navigate = useNavigate();
  const PAGE_SIZE = 7;

  const getMoreConcerts = async ({ keyword, searchAfter }: GetMoreProps) => {
    const params: Record<string, string | number> = {
      query: keyword,
      pageSize: PAGE_SIZE,
    };

    if (searchAfter) {
      params.searchAfter1 = searchAfter[0];
      params.searchAfter2 = searchAfter[1];
    }

    return await publicAxios.get(endPoint.GET_MORE_CONCERT_SEARCH, { params });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<ConcertResult>({
      queryKey: ['search-concerts', keyword],
      queryFn: async ({ pageParam }) => {
        const {
          data: { result },
        } = await getMoreConcerts({ keyword, searchAfter: pageParam as Param });
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
      <SearchMoreConcertsContainer>
        <TitleText2>예정 공연</TitleText2>
        <div>로딩 중...</div>
      </SearchMoreConcertsContainer>
    );
  }

  return (
    <SearchMoreConcertsContainer>
      <TitleText2>예정 공연</TitleText2>
      {data?.pages?.map((page) =>
        page?.concertThumbnails?.map((concert) => (
          <ConcertItem
            concert={concert}
            key={concert.id}
            onClick={() => navigate(endPoint.GET_CONCERT_DETAIL(concert.id))}
          />
        ))
      )}
      <div ref={targetRef} />
    </SearchMoreConcertsContainer>
  );
};

const SearchMoreConcertsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7rem 2.4rem;
`;

export default SearchMoreConcerts;
