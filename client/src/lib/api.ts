import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-netlify-site.netlify.app/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string, salary: number) =>
    api.post('/auth/register', { name, email, password, salary }),
};

export const expenseAPI = {
  getExpenses: () => api.get('/expenses'),
  addExpense: (expense: { category: string; amount: number; description: string }) =>
    api.post('/expenses', expense),
  getStats: () => api.get('/expenses/stats'),
};

export default api;