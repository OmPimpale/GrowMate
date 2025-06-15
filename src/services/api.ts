import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Default Content-Type, will be overridden by FormData
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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

  // Modified updateUser to accept FormData
  updateUser: async (data: FormData) => {
    // When sending FormData, Axios automatically sets the Content-Type to multipart/form-data
    // We don't need to explicitly set it here.
    const response = await api.put('/user/me', data);
    return response.data;
  },
};

// Habits API
export const habitsAPI = {
  getAll: async () => {
    const response = await api.get('/habits');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/habits/${id}`);
    return response.data;
  },

  create: async (habitData: any) => {
    const response = await api.post('/habits', habitData);
    return response.data;
  },

  update: async (id: string, habitData: any) => {
    const response = await api.put(`/habits/${id}`, habitData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/habits/${id}`);
    return response.data;
  },

  // Note: You have a duplicate updateUser in habitsAPI.
  // It's likely you only need it in authAPI. You can remove this one.
  // updateUser: async (userData: { name: string; image?: string }) => {
  //   const response = await api.put('/user/me', userData);
  //   return response.data;
  // },
};

// Habit Logs API
export const habitLogsAPI = {
  getAll: async () => {
    const response = await api.get('/habit-logs');
    return response.data;
  },

  getByHabit: async (habitId: string) => {
    const response = await api.get(`/habit-logs/habit/${habitId}`);
    return response.data;
  },

  toggle: async (habitId: string, date: string) => {
    const response = await api.post('/habit-logs/toggle', { habitId, date });
    return response.data;
  },

  checkCompletion: async (habitId: string, date: string) => {
    const response = await api.get(`/habit-logs/check?habitId=${habitId}&date=${date}`);
    return response.data;
  },
};

export default api;
