
import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '../types';

interface ICategoryDocument extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['drink', 'bakery', 'food'],
      required: true,
    },
    image: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategoryDocument>('Category', CategorySchema);
