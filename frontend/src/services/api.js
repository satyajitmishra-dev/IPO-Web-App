import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:5001/api/',
  timeout: 10000,
});

export default apiClient;