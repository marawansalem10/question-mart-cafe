
import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from '../types';

interface IOrderDocument extends IOrder, Document {}

const OrderItemSchema: Schema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    selectedSize: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const OrderSchema: Schema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    serviceFee: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'wallet'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    orderType: {
      type: String,
      enum: ['dine_in', 'takeaway', 'delivery'],
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
OrderSchema.index({ customer: 1 }); // For user order queries
OrderSchema.index({ orderStatus: 1 }); // For status filtering
OrderSchema.index({ createdAt: -1 }); // For sorting recent orders
OrderSchema.index({ customer: 1, createdAt: -1 }); // Compound index for user orders
OrderSchema.index({ orderStatus: 1, createdAt: -1 }); // Compound index for admin status queries

export default mongoose.model<IOrderDocument>('Order', OrderSchema);
