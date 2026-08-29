/**
 * Question Mart & Cafe - API Endpoint Constants
 * Centralized API endpoint definitions
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Base
  BASE: API_BASE_URL,
  HEALTH: `${API_BASE_URL}/health`,

  // Auth
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    ME: `${API_BASE_URL}/api/auth/me`,
  },

  // Users
  USERS: {
    PROFILE: `${API_BASE_URL}/api/users/profile`,
  },

  // Products
  PRODUCTS: {
    ALL: `${API_BASE_URL}/api/products`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/products/${id}`,
  },

  // Categories
  CATEGORIES: {
    ALL: `${API_BASE_URL}/api/categories`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/categories/${id}`,
  },

  // Orders
  ORDERS: {
    ALL: `${API_BASE_URL}/api/orders`,
    MY_ORDERS: `${API_BASE_URL}/api/orders/my-orders`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/orders/${id}`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/api/orders/${id}/status`,
  },

  // Reservations
  RESERVATIONS: {
    ALL: `${API_BASE_URL}/api/reservations`,
    MY_RESERVATIONS: `${API_BASE_URL}/api/reservations/my-reservations`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/reservations/${id}`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/api/reservations/${id}/status`,
  },

  // Reviews
  REVIEWS: {
    ALL: `${API_BASE_URL}/api/reviews`,
    BY_PRODUCT: (productId: string) => `${API_BASE_URL}/api/reviews/product/${productId}`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/reviews/${id}`,
    APPROVE: (id: string) => `${API_BASE_URL}/api/reviews/${id}/approve`,
  },

  // Loyalty
  LOYALTY: {
    ME: `${API_BASE_URL}/api/loyalty/me`,
    BY_USER: (userId: string) => `${API_BASE_URL}/api/loyalty/${userId}`,
    ADD_POINTS: (userId: string) => `${API_BASE_URL}/api/loyalty/${userId}/add-points`,
    REMOVE_POINTS: (userId: string) => `${API_BASE_URL}/api/loyalty/${userId}/remove-points`,
    UPDATE_MEMBERSHIP: (userId: string) => `${API_BASE_URL}/api/loyalty/${userId}/membership`,
    REGENERATE_QR: (userId: string) => `${API_BASE_URL}/api/loyalty/${userId}/regenerate-qr`,
  },

  // Rewards
  REWARDS: {
    ALL: `${API_BASE_URL}/api/rewards`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/rewards/${id}`,
    REDEEM: (id: string) => `${API_BASE_URL}/api/rewards/${id}/redeem`,
    HISTORY: `${API_BASE_URL}/api/rewards/history/me`,
  },

  // Branches
  BRANCHES: {
    ALL: `${API_BASE_URL}/api/branches`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/branches/${id}`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/api/branches/${id}/status`,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;
