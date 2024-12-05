import { endPoint } from 'constants/endPoint';
import { publicAxios } from 'utils';

const getConcertList = async (region: string, sortDirection: string, pageSize: number) => {
  const response = await publicAxios.get(
    endPoint.GET_CONCERT_LIST(region, sortDirection, pageSize)
  );
  return response;
};

export { getConcertList };
