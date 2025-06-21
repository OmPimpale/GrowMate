import axios from 'axios';
import api from './api'; // Import the default exported axios instance

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/user/me');
    return response.data;
  },

  // Modified updateUser to accept and send JSON with name
  updateUser: async (userData: { name?: string }) => {
    const response = await api.put('/user/me', userData); // Send JSON data
    return response.data;
  },
};