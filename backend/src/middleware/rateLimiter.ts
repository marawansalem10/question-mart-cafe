import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // Limit each IP to 100 requests per windowMs

const cleanupStore = () => {
  const now = Date.now();
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
};

// Run cleanup every minute
setInterval(cleanupStore, 60 * 1000);

export const rateLimiter = (windowMs: number = WINDOW_MS, maxRequests: number = MAX_REQUESTS) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const key = `${ip}-${req.path}`;
    const now = Date.now();

    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return next();
    }

    store[key].count++;

    if (store[key].count > maxRequests) {
      const resetTime = Math.ceil((store[key].resetTime - now) / 1000);
      return res.status(429).json({
        message: 'Too many requests from this IP, please try again later',
        retryAfter: resetTime,
      });
    }

    next();
  };
};

export const authRateLimiter = rateLimiter(15 * 60 * 1000, 5); // 5 requests per 15 minutes for auth
