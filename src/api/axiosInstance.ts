import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL || 'http://127.0.0.1:8000/api/v0.1',
  withCredentials: true,
});