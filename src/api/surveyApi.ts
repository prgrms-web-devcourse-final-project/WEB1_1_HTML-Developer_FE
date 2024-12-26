import { endPoint } from 'constants/endPoint';
import type { CreatedSurveyListResponse, SurveyListResponse } from 'types';
import { tokenAxios, publicAxios } from 'utils';

const getCreatedSurveyList = async () => {
  const { data } = await tokenAxios.get<CreatedSurveyListResponse>(
    endPoint.GET_CREATED_SURVEY_LIST
  );
  return data;
};

const requestGetAppliedSurveyList = async () => {
  const { data } = await tokenAxios.get(endPoint.GET_APPLIED_SURVEY_LIST);
  return data;
};

const requestGetSurveyList = async (query: string) => {
  const { data } = await publicAxios.get<SurveyListResponse>(
    `${endPoint.GET_SURVEY_LIST}?${query}`
  );
  return data.result;
};

export { getCreatedSurveyList, requestGetAppliedSurveyList, requestGetSurveyList };
