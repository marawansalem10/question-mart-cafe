
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

export default mongoose.model<IReviewDocument>('Review', ReviewSchema);
