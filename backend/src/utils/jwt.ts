
import jwt from 'jsonwebtoken';
import { IUser } from '../types';
import mongoose from 'mongoose';

export const generateToken = (user: IUser & { _id: mongoose.Types.ObjectId }) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: (process.env.JWT_EXPIRE || '30d') as jwt.SignOptions['expiresIn'],
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
