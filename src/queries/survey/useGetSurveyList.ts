import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetSurveyList } from 'api';
import { useFilterStore } from 'stores';
import type { SurveyListItem, PageParam } from 'types';
import { buildPaginatedFilterQuery } from 'utils';

export const useGetSurveyList = () => {
  const { surveyFilters } = useFilterStore(['surveyFilters']);

  const fetchFilteredList = async (pageParam: PageParam) => {
    const query = buildPaginatedFilterQuery(surveyFilters, pageParam);

    return await requestGetSurveyList(query);
  };

  return useInfiniteQuery<SurveyListItem[]>({
    queryKey: ['surveyList', surveyFilters],
    queryFn: ({ pageParam }) => {
      const param = pageParam as PageParam;
      return fetchFilteredList(param);
    },
    initialPageParam: { lastId: null, lastEndDate: null },
    getNextPageParam: (lastPage) => {
      const lastData = lastPage[lastPage.length - 1];
      return lastPage.length > 0
        ? { lastId: lastData.surveyId, lastEndDate: lastData.endDate }
        : undefined;
    },
  });
};
