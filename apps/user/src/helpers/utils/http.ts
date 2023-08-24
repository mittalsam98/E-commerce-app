import axios from 'axios';
import { getToken } from './localstorage';
import { BASE_URL } from './constant';

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 5, // Wait for 5 seconds
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
});
http.interceptors.request.use(function (config) {
  let token;
  token = getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // localStorage.clear();
    }
    return Promise.reject(error);
  }
);
export default http;
