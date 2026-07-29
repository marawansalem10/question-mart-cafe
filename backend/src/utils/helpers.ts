import mongoose from 'mongoose';

/**
 * Validate MongoDB ObjectId
 */
export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Calculate membership level from points
 */
export const calculateMembershipLevel = (points: number): 'bronze' | 'silver' | 'gold' | 'platinum' => {
  if (points >= 5000) return 'platinum';
  if (points >= 2500) return 'gold';
  if (points >= 1000) return 'silver';
  return 'bronze';
};

/**
 * Generate unique QR code
 */
export const generateQRCode = (): string => {
  return `QMC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

/**
 * Trim object string values recursively
 */
export const trimObject = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(trimObject);
  }

  const trimmed: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      trimmed[key] = obj[key].trim();
    } else if (typeof obj[key] === 'object') {
      trimmed[key] = trimObject(obj[key]);
    } else {
      trimmed[key] = obj[key];
    }
  }
  return trimmed;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize user input to prevent injection attacks
 */
export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};
