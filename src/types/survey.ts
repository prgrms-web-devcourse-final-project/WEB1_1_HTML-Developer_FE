import type { ApiResponse } from './api';

interface BaseSurveyInfo {
  surveyId: number;
  title: string;
  boardingDate: string;
  region: string;
  surveyStartDate: string;
  surveyEndDate: string;
  participationCount: number;
  maxPassenger: number;
}
export interface SurveyMetrics {
  upCount: number;
  downCount: number;
  roundCount: number;
}

export interface SurveyDetail extends SurveyMetrics {
  surveyResponse: BaseSurveyInfo;
}

export type SurveyListResponse = ApiResponse<SurveyDetail[]>;
