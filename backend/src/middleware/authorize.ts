
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: (IUser & { _id: mongoose.Types.ObjectId }) | null;
}

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
    }

    next();
  };
};

export default authorize;
