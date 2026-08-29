/**
 * Question Mart & Cafe - Admin Authentication Context
 * Manages admin authentication state and provides auth methods
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthUser, LoginCredentials } from '../types';
import { post } from '../services';
import { API_ENDPOINTS } from '../constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('admin_auth_user');
        const storedToken = localStorage.getItem('admin_auth_token');

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          
          // Validate that the user has admin or super_admin role
          if (parsedUser.role === 'admin' || parsedUser.role === 'super_admin') {
            setUser(parsedUser);
          } else {
            // Clear invalid authentication (non-admin user)
            localStorage.removeItem('admin_auth_user');
            localStorage.removeItem('admin_auth_token');
          }
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        // Clear invalid storage
        localStorage.removeItem('admin_auth_user');
        localStorage.removeItem('admin_auth_token');
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
      
      // Validate that the user has admin or super_admin role
      if (response.role !== 'admin' && response.role !== 'super_admin') {
        throw new Error('Access denied. Admin access required.');
      }
      
      // Store in localStorage
      localStorage.setItem('admin_auth_token', response.token);
      localStorage.setItem('admin_auth_user', JSON.stringify(response));
      
      // Update state
      setUser(response);
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('admin_auth_token');
    localStorage.removeItem('admin_auth_user');
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isAdmin: user?.role === 'admin' || user?.role === 'super_admin',
    login,
    logout,
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
