
import mongoose, { Schema, Document } from 'mongoose';
import { IReview } from '../types';

interface IReviewDocument extends IReview, Document {}

const ReviewSchema: Schema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      en: { type: String },
      ar: { type: String },
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
ReviewSchema.index({ customer: 1 }); // For user review queries
ReviewSchema.index({ product: 1 }); // For product review queries
ReviewSchema.index({ isApproved: 1 }); // For approval filtering
ReviewSchema.index({ product: 1, isApproved: 1 }); // Compound index for approved product reviews
ReviewSchema.index({ createdAt: -1 }); // For sorting recent reviews

export default mongoose.model<IReviewDocument>('Review', ReviewSchema);
