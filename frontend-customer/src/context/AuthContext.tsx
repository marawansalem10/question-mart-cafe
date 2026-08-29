/**
 * Question Mart & Cafe - Authentication Context
 * Manages authentication state and provides auth methods
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthUser, LoginCredentials, RegisterData } from '../types';
import { post } from '../services/api';
import { API_ENDPOINTS } from '../constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  register: (data: RegisterData) => Promise<AuthUser>;
  logout: () => void;
  updateUser: (user: User) => void;
  hasPermission: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        const storedToken = localStorage.getItem('auth_token');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        // Clear invalid storage
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthUser> => {
    try {
      const response = await post<AuthUser>(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Store in localStorage
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response));
      
      // Update state
      setUser(response);
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  // Register function
  const register = useCallback(async (data: RegisterData): Promise<AuthUser> => {
    try {
      const response = await post<AuthUser>(API_ENDPOINTS.AUTH.REGISTER, data);
      
      // Store in localStorage
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response));
      
      // Update state
      setUser(response);
      
      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  }, []);

  // Update user function
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
  }, []);

  // Permission check function
  const hasPermission = useCallback((role: string): boolean => {
    if (!user) return false;
    
    const roleHierarchy: Record<string, number> = {
      customer: 1,
      staff: 2,
      admin: 3,
      super_admin: 4,
    };

    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[role] || 0;

    return userLevel >= requiredLevel;
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
