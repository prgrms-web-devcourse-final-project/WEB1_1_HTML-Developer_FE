export const endPoint = {
  // Rent API
  GET_RENT_LIST: '/rents/list',
  GET_RENT_MAIN_LIST: '/rents/main',
  GET_CREATED_RENT_LIST: '/rents/register/list',
  GET_APPLIED_RENT_LIST: '/rents/join/list',
  GET_RENT_DETAIL: (id: string) => `/rents/${id}`,
  GET_CREATED_RENT_DETAIL: (id: string) => `/rents/${id}/register`,
  GET_DEPOSIT_ACCOUNT: (id: string) => `/rents/${id}/deposit-account`,

  // Rent Form API
  CREATE_RENT_FORM: '/rents',
  UPDATE_RENT_FORM: '/rents',
  APPLY_RENT_FORM: '/rents/apply',
  DELETE_APPLIED_RENT_FORM: '/rents/apply',
  UPDATE_APPLIED_RENT_FORM: '/rents/apply',
  CLOSE_RENT_FORM: '/rents/close',

  // Survey API
  GET_SURVEY_LIST: '/surveys/list',
  GET_CREATED_SURVEY_LIST: '/surveys/member/list',
  GET_APPLIED_SURVEY_LIST: '/surveys/member/apply/list',
  GET_SURVEY_DETAIL: (surveyId: string) => `/surveys/${surveyId}`,

  // Survey Form API
  CREATE_SURVEY_FORM: '/surveys',
  UPDATE_SURVEY_FORM: '/surveys',
  DELETE_SURVEY_FORM: '/surveys',
  APPLY_SURVEY_FORM: '/surveys/apply',

  // Auth API
  AUTH_KAKAO: '/auth/token/kakao',
  REISSUE_TOKEN: '/auth/token/reissue',
  SIGNIN: '/signin',
  SIGNUP: '/members/register',

  // User API
  GET_PROFILE: '/members',
  UPDATE_PROFILE: '/members/info',
  CREATE_REFUND_ACCOUNT: '/members/refund-account',
  UPDATE_REFUND_ACCOUNT: '/members/refund-account',
  DELETE_REFUND_ACCOUNT: '/members/refund-account',

  // Concert API
  GET_CONCERT_LIST: '/concerts/list',
  GET_CONCERT_DETAIL: (concertId: number) => `/concerts/${concertId}`,

  // Concert Hall API
  GET_CONCERT_HALL: (hallCode: string) => `/concert-halls/${hallCode}`,

  // Search API
  GET_CONCERT_SEARCH: '/search/concert',
  GET_CONCERT_SEARCH_LIST: '/search/concert/list',
  SEARCH_ARTISTS: '/artists/search',
};
