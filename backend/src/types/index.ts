
import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'customer' | 'staff' | 'admin' | 'super_admin';
  language: 'en' | 'ar';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  name: { en: string; ar: string };
  description?: { en: string; ar: string };
  slug: string;
  type: 'drink' | 'bakery' | 'food';
  image?: string;
  displayOrder?: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductSize {
  name: string;
  price: number;
}

export interface IProduct {
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  category: mongoose.Types.ObjectId | ICategory;
  sizes: IProductSize[];
  image?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  displayOrder?: number;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReservation {
  customer: mongoose.Types.ObjectId | IUser;
  date: Date;
  time: string;
  guests: number;
  seatingType: 'indoor' | 'outdoor';
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoyalty {
  customer: mongoose.Types.ObjectId | IUser;
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  qrCode: string;
  points: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPointsTransaction {
  loyalty: mongoose.Types.ObjectId | ILoyalty;
  type: 'earn' | 'redeem' | 'admin_add' | 'admin_remove';
  amount: number;
  description: string;
  createdAt?: Date;
}

export interface IReward {
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  pointsRequired: number;
  image?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReview {
  customer: mongoose.Types.ObjectId | IUser;
  product?: mongoose.Types.ObjectId | IProduct;
  rating: number;
  comment?: { en: string; ar: string };
  isApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBranch {
  name: { en: string; ar: string };
  address: { en: string; ar: string };
  phone: string;
  email: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
