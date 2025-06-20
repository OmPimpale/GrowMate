import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

interface User {
  id: string;
  name: string;
  image?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser();
          setUser({
            id: userData.id.toString(),
            name: userData.name,
            email: userData.email
          });
        } catch (error) {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login(email, password);

      const userData = {
        id: response.id.toString(),
        name: response.name,
        email: response.email
      };

      setUser(userData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));

      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.signup(name, email, password);

      const userData = {
        id: response.id.toString(),
        name: response.name,
        email: response.email
      };

      setUser(userData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));

      return true;
    } catch (error: any) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;

    try {
      const updated = await authAPI.updateUser(userData); // Now sending JSON
      const updatedUser = { ...user, ...updated };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      loading,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};