
import mongoose, { Schema, Document } from 'mongoose';
import { ILoyalty } from '../types';

interface ILoyaltyDocument extends ILoyalty, Document {}

const LoyaltySchema: Schema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    membershipLevel: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum'],
      default: 'bronze',
    },
    qrCode: {
      type: String,
      required: true,
      unique: true,
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILoyaltyDocument>('Loyalty', LoyaltySchema);
