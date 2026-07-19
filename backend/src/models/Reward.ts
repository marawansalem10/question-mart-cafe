
import mongoose, { Schema, Document } from 'mongoose';
import { IReward } from '../types';

interface IRewardDocument extends IReward, Document {}

const RewardSchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    description: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
    },
    pointsRequired: {
      type: Number,
      required: true,
      min: 0,
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

export default mongoose.model<IRewardDocument>('Reward', RewardSchema);
