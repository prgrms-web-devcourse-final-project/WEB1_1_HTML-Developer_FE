import { endPoint } from 'constants/endPoint';
import type { CreatedSurveyListResponse, SurveyListResponse } from 'types';
import { tokenAxios, publicAxios } from 'utils';

const getCreatedSurveyList = async (): Promise<CreatedSurveyListResponse> => {
  const { data } = await tokenAxios.get(endPoint.GET_CREATED_SURVEY_LIST);
  return data;
};

const getAppliedSurveyList = async () => {
  const { data } = await tokenAxios.get(endPoint.GET_APPLIED_SURVEY_LIST);
  return data;
};

const getSurveyList = async (): Promise<SurveyListResponse> => {
  const { data } = await publicAxios.get(endPoint.GET_SURVEY_LIST);
  return data;
};

export { getCreatedSurveyList, getAppliedSurveyList, getSurveyList };
