import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { CONFIG } from '../config';
import { storage } from '../utils/storage';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user session already exists in local storage
    const storedToken = storage.get<string>(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    const storedUser = storage.get<User>(CONFIG.STORAGE_KEYS.USER_DATA);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, authToken: string) => {
    setToken(authToken);
    setUser(userData);
    storage.set(CONFIG.STORAGE_KEYS.AUTH_TOKEN, authToken);
    storage.set(CONFIG.STORAGE_KEYS.USER_DATA, userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    storage.remove(CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(CONFIG.STORAGE_KEYS.USER_DATA);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
