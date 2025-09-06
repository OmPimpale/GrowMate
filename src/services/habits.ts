import api from "./api";

// Habits API
export const habitsAPI = {
  getAll: async () => {
    try {
      const response = await api.get("/habits");
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/habits/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  create: async (habitData: any) => {
    try {
      const response = await api.post("/habits", habitData);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  update: async (id: string, habitData: any) => {
    try {
      const response = await api.put(`/habits/${id}`, habitData);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete(`/habits/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

// Habit Logs API
export const habitLogsAPI = {
  getAll: async () => {
    try {
      const response = await api.get("/habit-logs");
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getByHabit: async (habitId: string) => {
    try {
      const response = await api.get(`/habit-logs/habit/${habitId}`);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  toggle: async (habitId: string, date: string) => {
    try {
      const response = await api.post("/habit-logs/toggle", { habitId, date });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  checkCompletion: async (habitId: string, date: string) => {
    try {
      const response = await api.get(
        `/habit-logs/check?habitId=${habitId}&date=${date}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
