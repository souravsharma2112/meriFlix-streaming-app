import axios from 'axios';
// const BASE_URL = 'https://api.themoviedb.org/3';
// const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjhiNmMyN2U2N2JmY2IxMDczOThjNmIzMjJlMmUwYiIsIm5iZiI6MTc2MDI3NDI0OC42ODMsInN1YiI6IjY4ZWJhNzQ4NDE0ZjE4NWM1NThhYWI5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ydrTRcYlhT8oRvCOjGuDq8NYRJXu3iBiUzHTp1qQYEM';
const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
});

export default axiosInstance;
