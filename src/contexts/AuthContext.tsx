import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/authAPI';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: { name?: string }) => Promise<void>; // Signature for name only
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          const userData = await authAPI.getCurrentUser();
          const updatedUser = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
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
        id: response.id,
        name: response.name,
        email: response.email,
        // Removed image from login response handling
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
    console.log('password: ', password);
    console.log('email: ', email);
    console.log('name: ', name);
    try {
      const response = await authAPI.signup(name, email, password);
      console.log('response: ', response);
      console.log('password: ', password);
      console.log('email: ', email);
      console.log('name: ', name);

      const userData = {
        id: response.id,
        name: response.name,
        email: response.email,
        // Removed image from signup response handling
      };
      console.log('userData: ', userData);

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

  // Modified updateUser to only handle name and send JSON
  const updateUser = async (userData: { name?: string }): Promise<void> => {
    if (!user) return;

    try {
      // Assuming backend expects JSON with name
      const response = await authAPI.updateUser(userData); // Pass userData object directly

      const updatedUser = { ...user, ...response }; // Assuming backend returns the updated user with name
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
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