import { endPoint } from 'constants/endPoint';
import type { RecordDetailResponse, RecordListResponse } from 'types';
import { tokenAxios } from 'utils';

export const requestPostConcertRecord = async (formData: FormData) => {
  return await tokenAxios.post(`${endPoint.CREATE_CONCERT_RECORD}`, formData);
};

export const requestGetConcertRecordList = async (query: string) => {
  const { data } = await tokenAxios.get<RecordListResponse>(
    `${endPoint.GET_CONCERT_RECORD_LIST}?${query}`
  );
  return data;
};

export const requestGetConcertRecordDetails = async (id: string) => {
  const { data } = await tokenAxios.get<RecordDetailResponse>(
    `${endPoint.GET_CONCERT_RECORD_DETAILS(id)}`
  );
  return data;
};
