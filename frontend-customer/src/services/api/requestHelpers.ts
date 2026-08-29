/**
 * Question Mart & Cafe - API Request Helpers
 * Helper functions for common API operations
 */

import axiosInstance from './axiosInstance';

export interface RequestOptions {
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
}

/**
 * Generic GET request
 */
export const get = async <T = any>(url: string, options?: RequestOptions): Promise<T> => {
  const response = await axiosInstance.get<T>(url, { params: options?.params, headers: options?.headers });
  return response.data;
};

/**
 * Generic POST request
 */
export const post = async <T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data, { headers: options?.headers });
  return response.data;
};

/**
 * Generic PUT request
 */
export const put = async <T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data, { headers: options?.headers });
  return response.data;
};

/**
 * Generic PATCH request
 */
export const patch = async <T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> => {
  const response = await axiosInstance.patch<T>(url, data, { headers: options?.headers });
  return response.data;
};

/**
 * Generic DELETE request
 */
export const del = async <T = any>(url: string, options?: RequestOptions): Promise<T> => {
  const response = await axiosInstance.delete<T>(url, { headers: options?.headers });
  return response.data;
};

/**
 * Upload file
 */
export const upload = async <T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });

  return response.data;
};

/**
 * Download file
 */
export const download = async (url: string, filename: string): Promise<void> => {
  const response = await axiosInstance.get(url, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};
