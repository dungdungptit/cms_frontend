// axios.js
import axios from 'axios';
import { ip } from './ip';
axios.defaults.baseURL = `${ip}`;
// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    if (
      // config.baseURL === baseApiAddress &&
      !config.headers.Authorization
    ) {
      const token = localStorage.getItem('token');
      if (token) {
        // eslint-disable-next-line no-param-reassign
        // config.headers.auth_token = `${token}`;
        config.headers.Authorization = `token ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axios;
