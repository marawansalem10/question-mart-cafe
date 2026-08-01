
import mongoose, { Schema, Document } from 'mongoose';
import { IPointsTransaction } from '../types';

interface IPointsTransactionDocument extends IPointsTransaction, Document {}

const PointsTransactionSchema: Schema = new Schema(
  {
    loyalty: {
      type: Schema.Types.ObjectId,
      ref: 'Loyalty',
      required: true,
    },
    type: {
      type: String,
      enum: ['earn', 'redeem', 'admin_add', 'admin_remove'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
PointsTransactionSchema.index({ loyalty: 1 }); // For loyalty history queries
PointsTransactionSchema.index({ type: 1 }); // For type filtering
PointsTransactionSchema.index({ createdAt: -1 }); // For sorting recent transactions
PointsTransactionSchema.index({ loyalty: 1, createdAt: -1 }); // Compound index for user transaction history

export default mongoose.model<IPointsTransactionDocument>('PointsTransaction', PointsTransactionSchema);
