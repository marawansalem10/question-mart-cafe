
import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '../types';

interface IProductDocument extends IProduct, Document {}

const ProductSizeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const ProductSchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    description: {
      en: { type: String, default: '' },
      ar: { type: String, default: '' },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    sizes: {
      type: [ProductSizeSchema],
      required: true,
    },
    image: String,
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProductDocument>('Product', ProductSchema);
