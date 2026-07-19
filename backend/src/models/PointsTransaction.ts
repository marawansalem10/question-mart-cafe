
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

export default mongoose.model<IPointsTransactionDocument>('PointsTransaction', PointsTransactionSchema);
