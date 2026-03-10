import axios from 'axios';
import {TOKEN , BASE_URL} from '@env'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});


export default axiosInstance;
