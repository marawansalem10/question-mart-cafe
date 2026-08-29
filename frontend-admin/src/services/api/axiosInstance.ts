/**
 * Question Mart & Cafe - Admin Axios Instance
 * Configured Axios instance with interceptors for Admin Dashboard
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_ENDPOINTS, HTTP_STATUS } from '../../constants';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINTS.BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('admin_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp for debugging
    config.metadata = { startTime: new Date() };

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Calculate request duration
    const endTime = new Date();
    const duration = endTime.getTime() - (response.config.metadata?.startTime?.getTime() || 0);

    // Log in development
    if ((import.meta as any).env?.DEV) {
      console.log(`[Admin API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear authentication and redirect to login
      localStorage.removeItem('admin_auth_token');
      localStorage.removeItem('admin_auth_user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      console.error('[Admin API] Network Error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        originalError: error,
      });
    }

    // Handle other HTTP errors
    const errorMessage = (error.response.data as any)?.message || 'An error occurred. Please try again.';
    return Promise.reject({
      message: errorMessage,
      status: error.response.status,
      originalError: error,
    });
  }
);

// Extend AxiosRequestConfig to include metadata
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
    _retry?: boolean;
  }
}

export default axiosInstance;
