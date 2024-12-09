import type { ApiResponse } from './api';

export interface SurveyListItem {
  surveyId: number;
  title: string;
  region: string;
  participationCount: number;
  endDate: string;
}

interface BoardingDate {
  date: string;
  participationCount: number;
}

interface SurveyDetail {
  surveyId: number;
  title: string;
  boardingDates: BoardingDate[];
  information: string;
  isClosed: boolean;
}

export interface SurveyResponse {
  surveyId: number;
  title: string;
  boardingDate: string;
  region: string;
  surveyStartDate: string;
  surveyEndDate: string;
  participationCount: number;
  maxPassenger: number;
}

interface CreatedSurveyItem {
  surveyResponse: SurveyResponse;
  upCount: number;
  downCount: number;
  roundCount: number;
}

type BoardingType = 'ROUND' | 'UP' | 'DOWN';

interface AppliedSurveyItem {
  surveyResponse: SurveyResponse;
  surveyJoinId: number;
  applyDate: string;
  boardingType: BoardingType;
  passengerNum: number;
}

export type SurveyListResponse = ApiResponse<SurveyListItem[]>;
export type SurveyDetailResponse = ApiResponse<SurveyDetail>;
export type CreatedSurveyListResponse = ApiResponse<CreatedSurveyItem[]>;
export type AppliedSurveyListResponse = ApiResponse<AppliedSurveyItem[]>;
