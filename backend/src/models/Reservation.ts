
import mongoose, { Schema, Document } from 'mongoose';
import { IReservation } from '../types';

interface IReservationDocument extends IReservation, Document {}

const ReservationSchema: Schema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    seatingType: {
      type: String,
      enum: ['indoor', 'outdoor'],
      required: true,
    },
    notes: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReservationDocument>('Reservation', ReservationSchema);
