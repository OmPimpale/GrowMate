import api from "./api"; // Import the default exported axios instance

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/user/me");
      return response.data;
    } catch (error) {
      return error;
    }
  },

  // Modified updateUser to accept and send JSON with name
  updateUser: async (userData: { name?: string }) => {
    try {
      const response = await api.put("/user/me", userData); // Send JSON data
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
