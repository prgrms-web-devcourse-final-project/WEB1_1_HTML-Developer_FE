import axios from 'axios';

import { endPoint } from 'constants/endPoint';
import { API_URL } from 'constants/url';
import { authStore } from 'stores';
// import { tokenAxios } from 'utils';

// 추후 tokenAxios로 변경
const testAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  },
});

testAxios.interceptors.request.use((config) => {
  const { token } = authStore.getState();

  if (token) config.headers.Authorization = token;
  return config;
});

export const requestPostRentalForm = async (formData: string) => {
  return await testAxios.post(`${endPoint.CREATE_RENT_FORM}`, formData);
};
