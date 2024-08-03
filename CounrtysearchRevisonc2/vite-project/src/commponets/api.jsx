import axios from 'axios';

const api = axios.create({
  baseURL:"https://masai-7l8w.onrender.com/api/",
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;