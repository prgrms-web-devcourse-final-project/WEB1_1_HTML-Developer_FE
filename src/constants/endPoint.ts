export const endPoint = {
  GET_DEPOSIT_ACCOUNT: (id: string) => `/rents/${id}/deposit-account`,
  GET_RENT_LIST: '/rents/list',
  GET_RENT_DETAIL: (id: string) => `/rents/${id}`,

  CREATE_RENT_FORM: '/rents',
  UPDATE_RENT_FORM: '/rents',
  CLOSE_RENT_FORM: '/rents',

  CREATE_SURVEY_FORM: '/surveys',
  UPDATE_SURVEY_FORM: '/surveys',
  DELETE_SURVEY_FORM: '/surveys',
  APPLY_SURVEY_FORM: '/surveys/apply',
  GET_SURVEY_DETAIL: (surveyId: string) => `/surveys/${surveyId}`,

  GET_CREATED_SURVEY_LIST: '/surveys/member/list',
  GET_APPLIED_SURVEY_LIST: '/surveys/member/apply/list',
  GET_SURVEY_LIST: '/surveys/list',

  SIGNUP: '/oauth2/register',
  SIGNIN: '/oauth2/login',

  CREATE_REFUND_ACCOUNT: '/members/refund-account',
  UPDATE_REFUND_ACCOUNT: '/members/refund-account',
  DELETE_REFUND_ACCOUNT: '/members/refund-account',
  UPDATE_PROFILE: '/members/info',
  GET_PROFILE: '/members',

  GET_CONCERT_HALL: (hallCode: string) => `/concert-halls/${hallCode}`,

  GET_CONCERT_SEARCH: '/search/concert',
  GET_CONCERT_SEARCH_LIST: '/search/concert/list',

  GET_CONCERT_LIST: '/concerts/list',
  GET_CONCERT_DETAIL: (concertId: string) => `/concerts/${concertId}`,

  SEARCH_ARTISTS: '/artists/search',
};
