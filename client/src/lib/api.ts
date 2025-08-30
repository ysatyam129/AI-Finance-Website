import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://ai-finance-backend-swart.vercel.app/api'
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
  getExpenses: async () => {
    try {
      const response = await api.get('/expenses');
      return response.data; // This should be the expenses array directly
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  },
  
  getStats: async () => {
    try {
      const response = await api.get('/expenses/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },
  
  addExpense: async (expense: { category: string; amount: number; description: string }) => {
    try {
      const response = await api.post('/expenses', expense);
      return response.data;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  }
};

export default api;