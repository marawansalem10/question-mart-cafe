
import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '../types';

interface ICategoryDocument extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    description: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
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
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
CategorySchema.index({ slug: 1 }); // Already unique, but explicit for clarity
CategorySchema.index({ type: 1 }); // For type filtering
CategorySchema.index({ isActive: 1 }); // For active filtering
CategorySchema.index({ displayOrder: 1 }); // For sorting
CategorySchema.index({ isActive: 1, displayOrder: 1 }); // Compound index for active categories
CategorySchema.index({ type: 1, isActive: 1 }); // Compound index for type queries

export default mongoose.model<ICategoryDocument>('Category', CategorySchema);
