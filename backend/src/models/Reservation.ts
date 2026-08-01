
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

// Indexes for performance
ReservationSchema.index({ customer: 1 }); // For user reservation queries
ReservationSchema.index({ date: 1 }); // For date filtering
ReservationSchema.index({ status: 1 }); // For status filtering
ReservationSchema.index({ customer: 1, date: -1 }); // Compound index for user reservations
ReservationSchema.index({ date: 1, status: 1 }); // Compound index for daily reservations

export default mongoose.model<IReservationDocument>('Reservation', ReservationSchema);
