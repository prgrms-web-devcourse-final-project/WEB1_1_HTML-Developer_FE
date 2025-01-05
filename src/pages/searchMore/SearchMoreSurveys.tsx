import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import type { GetMoreProps, Param, SurveyResult } from './type';

import { endPoint } from 'constants/endPoint';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import SurveyItem from 'pages/surveys/components/SurveyItem';
import { TitleText2 } from 'styles/Typography';
import { publicAxios } from 'utils';

const SearchMoreSurveys = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const PAGE_SIZE = 7;

  const getMoreSurveys = async ({ keyword, searchAfter }: GetMoreProps) => {
    const params: Record<string, string | number> = {
      query: keyword,
      pageSize: PAGE_SIZE,
    };

    if (searchAfter) {
      params.searchAfter1 = searchAfter[0];
      params.searchAfter2 = searchAfter[1];
    }

    return await publicAxios.get(endPoint.GET_MORE_SURVEYS_SEARCH, { params });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<SurveyResult>({
    queryKey: ['search-concerts', keyword],
    queryFn: async ({ pageParam }) => {
      const {
        data: { result },
      } = await getMoreSurveys({ keyword, searchAfter: pageParam as Param });
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

  return (
    <SearchMoreSurveysContainer>
      <TitleText2>차량 대절 수요 조사</TitleText2>
      {data?.pages.map((page) =>
        page.surveyThumbnails.map((survey) => (
          <SurveyItem
            endDate={survey.edDate}
            key={survey.id}
            participationCount={survey.participantNum}
            region={survey.region}
            surveyId={survey.id}
            title={survey.title}
          />
        ))
      )}
      <div ref={targetRef} />
    </SearchMoreSurveysContainer>
  );
};

const SearchMoreSurveysContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7rem 2.4rem;
  gap: 1.6rem;
`;

export default SearchMoreSurveys;
