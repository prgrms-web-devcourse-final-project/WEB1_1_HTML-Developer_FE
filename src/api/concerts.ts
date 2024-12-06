import { endPoint } from 'constants/endPoint';
import { publicAxios } from 'utils';

const getConcertList = async (
  region: string,
  sortDirection: string,
  searchAfter?: [number, string] | null
) => {
  const PAGE_SIZE = 7;
  const params = new URLSearchParams();

  if (region !== '전체') params.append('region', region);

  params.append('sortDirection', sortDirection);
  params.append('PageSize', PAGE_SIZE.toString());

  if (searchAfter) {
    params.append('searchAfter1', searchAfter[0].toString());
    params.append('searchAfter2', searchAfter[1]);
  }

  const response = await publicAxios.get(`${endPoint.GET_CONCERT_LIST}?${params.toString()}`);
  return response;
};

export { getConcertList };
