/**
 * Question Mart & Cafe - Theme Constants
 * Design system constants for TypeScript usage
 */

export const BREAKPOINTS = {
  XS: 320,
  SM: 384,
  MD: 480,
  LG: 768,
  XL: 1024,
  '2XL': 1280,
  '3XL': 1536,
} as const;

export const BREAKPOINT_NAMES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  '3XL': '3xl',
} as const;

export const SPACING = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
} as const;

export const FONT_SIZES = {
  DISPLAY_XL: 72,
  DISPLAY_LG: 60,
  DISPLAY_MD: 48,
  DISPLAY_SM: 36,
  H1: 40,
  H2: 32,
  H3: 28,
  H4: 24,
  H5: 20,
  H6: 18,
  BODY_LG: 18,
  BODY: 16,
  BODY_SM: 14,
  BODY_XS: 12,
  CAPTION: 14,
  OVERLINE: 12,
  BUTTON: 14,
} as const;

export const FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
} as const;

export const BORDER_RADIUS = {
  NONE: 0,
  SM: 2,
  MD: 4,
  LG: 8,
  XL: 12,
  '2XL': 16,
  '3XL': 24,
  FULL: 9999,
} as const;

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;

export const TRANSITION_DURATION = {
  FAST: 150,
  BASE: 250,
  SLOW: 350,
  SLOWER: 500,
} as const;

export const CONTAINER_WIDTHS = {
  XS: 320,
  SM: 384,
  MD: 448,
  LG: 512,
  XL: 576,
  '2XL': 672,
  '3XL': 768,
  '4XL': 896,
  '5XL': 1024,
  '6XL': 1152,
  '7XL': 1280,
  FULL: '100%',
} as const;

export const LOYALTY_TIERS = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
} as const;

export const LOYALTY_POINTS = {
  BRONZE_MAX: 999,
  SILVER_MIN: 1000,
  SILVER_MAX: 2499,
  GOLD_MIN: 2500,
  GOLD_MAX: 4999,
  PLATINUM_MIN: 5000,
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
} as const;

export const PAYMENT_METHOD = {
  CASH: 'cash',
  CARD: 'card',
  WALLET: 'wallet',
} as const;

export const ORDER_TYPE = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
  DELIVERY: 'delivery',
} as const;

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const SEATING_TYPE = {
  INDOOR: 'indoor',
  OUTDOOR: 'outdoor',
} as const;

export const USER_ROLES = {
  CUSTOMER: 'customer',
  STAFF: 'staff',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;

export const CATEGORY_TYPE = {
  DRINK: 'drink',
  BAKERY: 'bakery',
  FOOD: 'food',
} as const;

export const LANGUAGES = {
  ENGLISH: 'en',
  ARABIC: 'ar',
} as const;

export const DIRECTIONS = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const;
