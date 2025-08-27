import api from './api';

export const seedAPI = {
  // Add sample expenses for current user
  addSampleExpenses: () => api.post('/seed/expenses'),
  
  // Add sample expenses for all users (admin function)
  addSampleForAllUsers: () => api.post('/seed/all-users'),
  
  // Manually trigger balance check
  triggerBalanceCheck: () => api.post('/seed/check-balance'),
};

export default seedAPI;