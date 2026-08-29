/**
 * Question Mart & Cafe - Route Constants
 * Centralized route definitions for maintainability
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  ABOUT: '/about',
  MENU: '/menu',
  RESERVATIONS: '/reservations',
  CONTACT: '/contact',

  // Auth Routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Protected Routes
  PROFILE: '/profile',
  ORDERS: '/orders',
  ORDER_DETAILS: '/orders/:id',
  RESERVATIONS_MY: '/my-reservations',
  RESERVATION_DETAILS: '/my-reservations/:id',
  LOYALTY: '/loyalty',
  REWARDS: '/rewards',
  SETTINGS: '/settings',

  // Product Routes
  PRODUCT_DETAILS: '/product/:id',
  CATEGORY: '/category/:slug',

  // Admin Routes (separate admin app)
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_RESERVATIONS: '/admin/reservations',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_USERS: '/admin/users',
  ADMIN_LOYALTY: '/admin/loyalty',
  ADMIN_REWARDS: '/admin/rewards',
  ADMIN_BRANCHES: '/admin/branches',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.MENU,
  ROUTES.RESERVATIONS,
  ROUTES.CONTACT,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.PRODUCT_DETAILS,
  ROUTES.CATEGORY,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.PROFILE,
  ROUTES.ORDERS,
  ROUTES.ORDER_DETAILS,
  ROUTES.RESERVATIONS_MY,
  ROUTES.RESERVATION_DETAILS,
  ROUTES.LOYALTY,
  ROUTES.REWARDS,
  ROUTES.SETTINGS,
] as const;

export const ADMIN_ROUTES = [
  ROUTES.ADMIN_DASHBOARD,
  ROUTES.ADMIN_PRODUCTS,
  ROUTES.ADMIN_CATEGORIES,
  ROUTES.ADMIN_ORDERS,
  ROUTES.ADMIN_RESERVATIONS,
  ROUTES.ADMIN_REVIEWS,
  ROUTES.ADMIN_USERS,
  ROUTES.ADMIN_LOYALTY,
  ROUTES.ADMIN_REWARDS,
  ROUTES.ADMIN_BRANCHES,
  ROUTES.ADMIN_SETTINGS,
] as const;
