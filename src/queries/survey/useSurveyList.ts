import { useQuery } from '@tanstack/react-query';

import { getSurveyList } from 'api';

export const useSurveyList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['surveyList'],
    queryFn: getSurveyList,
    staleTime: 1000 * 60 * 5, // 5분
  });

  return {
    isLoading,
    surveyList: data,
  };
};
