import { endPoint } from 'constants/endPoint';
import { publicAxios } from 'utils';

const getConcertList = async (region: string, sortDirection: string, pageSize: number) => {
  const params = new URLSearchParams();

  if (region !== '전체') params.append('region', region);

  params.append('sortDirection', sortDirection);
  params.append('PageSize', pageSize.toString());

  const response = await publicAxios.get(`${endPoint.GET_CONCERT_LIST}?${params.toString()}`);
  return response;
};

export { getConcertList };
