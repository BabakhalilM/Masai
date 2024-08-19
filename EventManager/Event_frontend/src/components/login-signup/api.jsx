import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://pollify-yc1z.onrender.com/api',
  // baseURL:"http://localhost:2300/api/",
  baseURL:"https://event-manager-p6m5.onrender.com",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
