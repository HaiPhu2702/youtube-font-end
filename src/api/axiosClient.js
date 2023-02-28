import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: "https://backend-youtube-1l61.onrender.com/api",
  headers: {
    'content-type': 'application/json'
},
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;