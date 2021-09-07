import axios from 'axios';
import { API } from '../config';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: API
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
