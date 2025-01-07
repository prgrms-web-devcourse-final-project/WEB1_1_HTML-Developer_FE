import { useQuery, useQueryClient } from '@tanstack/react-query';

import { requestGetConcertRecordList } from 'api';
import type { ConcertRecord } from 'types';

export const useGetConcertRecordList = (year: number, month: number) => {
  const queryClient = useQueryClient();

  const fetchRecordList = async (year: number, month: number) => {
    const query = `year=${year}&month=${month}`;
    const { result } = await requestGetConcertRecordList(query);
    return result;
  };

  const fetchCurrentMonth = async () => {
    const recordList = await fetchRecordList(year, month);

    const prevMonth = month === 1 ? 12 : month - 1;
    const nextMonth = month === 12 ? 1 : month + 1;

    const prevYear = month === 1 ? year - 1 : year;
    const nextYear = month === 12 ? year + 1 : year;

    await queryClient.prefetchQuery({
      queryKey: ['recordList', prevYear, prevMonth],
      queryFn: () => fetchRecordList(prevYear, prevMonth),
    });

    await queryClient.prefetchQuery({
      queryKey: ['recordList', nextYear, nextMonth],
      queryFn: () => fetchRecordList(nextYear, nextMonth),
    });

    return recordList;
  };

  return useQuery<ConcertRecord[]>({
    queryKey: ['recordList', year, month],
    queryFn: fetchCurrentMonth,
    enabled: !!year && !!month,
  });
};
