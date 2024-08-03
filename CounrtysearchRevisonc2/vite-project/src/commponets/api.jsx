import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://pollify-yc1z.onrender.com/api',
  baseURL:"http://localhost:4200/api/",
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;