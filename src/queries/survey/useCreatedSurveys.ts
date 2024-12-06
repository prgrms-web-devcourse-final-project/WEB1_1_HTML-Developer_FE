import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getCreatedSurveyList } from 'api';

export const useCreatedSurveys = () => {
  const data = useQuery({
    queryKey: ['myCreatedSurveys'],
    queryFn: getCreatedSurveyList,
    staleTime: 1000 * 60 * 5, // 5분
  });

  return {
    surveys: data,
  };
};
