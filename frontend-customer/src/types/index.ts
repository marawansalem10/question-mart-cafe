/**
 * Question Mart & Cafe - Type Definitions
 * Centralized TypeScript type definitions
 */

// ========================================
// User Types
// ========================================

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'staff' | 'admin' | 'super_admin';
  language: 'en' | 'ar';
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// ========================================
// Product Types
// ========================================

export interface Product {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
  category: string;
  sizes: ProductSize[];
  image?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  displayOrder: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductSize {
  name: string;
  price: number;
}

// ========================================
// Category Types
// ========================================

export interface Category {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
  slug: string;
  type: 'drink' | 'bakery' | 'food';
  image?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// Order Types
// ========================================

export interface Order {
  _id: string;
  customer: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  serviceFee: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'wallet';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  orderStatus: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: string;
  productName: string;
  selectedSize: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface CreateOrderData {
  items: {
    product: string;
    selectedSize: string;
    quantity: number;
  }[];
  paymentMethod: 'cash' | 'card' | 'wallet';
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  discount?: number;
  serviceFee?: number;
  notes?: string;
}

// ========================================
// Reservation Types
// ========================================

export interface Reservation {
  _id: string;
  customer: string;
  date: string;
  time: string;
  guests: number;
  seatingType: 'indoor' | 'outdoor';
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateReservationData {
  date: string;
  time: string;
  guests: number;
  seatingType: 'indoor' | 'outdoor';
  notes?: string;
}

// ========================================
// Review Types
// ========================================

export interface Review {
  _id: string;
  customer: string;
  product: string;
  rating: number;
  comment?: {
    en: string;
    ar: string;
  };
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  product: string;
  rating: number;
  comment?: {
    en: string;
    ar: string;
  };
}

// ========================================
// Loyalty Types
// ========================================

export interface Loyalty {
  _id: string;
  customer: string;
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  qrCode: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface PointsTransaction {
  _id: string;
  loyalty: string;
  type: 'earn' | 'redeem' | 'admin_add' | 'admin_remove';
  amount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// Reward Types
// ========================================

export interface Reward {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
  pointsRequired: number;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RedemptionTransaction {
  _id: string;
  reward: Reward;
  pointsUsed: number;
  redeemedAt: string;
}

// ========================================
// Branch Types
// ========================================

export interface Branch {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  address: {
    en: string;
    ar: string;
  };
  phone: string;
  email: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// Common Types
// ========================================

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  originalError?: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ========================================
// UI Types
// ========================================

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
}
