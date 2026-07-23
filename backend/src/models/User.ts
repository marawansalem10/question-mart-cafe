
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types';

interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    phone: String,
    role: {
      type: String,
      enum: ['customer', 'staff', 'admin', 'super_admin'],
      default: 'customer',
    },
    language: {
      type: String,
      enum: ['en', 'ar'],
      default: 'en',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserDocument>('User', UserSchema);
