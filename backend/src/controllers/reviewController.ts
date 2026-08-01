
import { Request, Response } from 'express';
import Review from '../models/Review';
import Product from '../models/Product';
import mongoose from 'mongoose';
import { isValidObjectId } from '../utils/helpers';

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private/Customer
export const createReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { product, rating, comment } = req.body;

    // Validate required fields
    if (!product || !rating) {
      return res.status(400).json({ message: 'Product and rating are required' });
    }

    // Validate product ID
    if (!isValidObjectId(product)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Validate rating
    if (typeof rating !== 'number' || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return res.status(400).json({ message: 'Rating must be an integer between 1 and 5' });
    }

    // Validate product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ customer: req.user._id, product });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Trim comment if provided
    const trimmedComment = comment ? {
      en: comment.en ? comment.en.trim() : undefined,
      ar: comment.ar ? comment.ar.trim() : undefined,
    } : undefined;

    // Create review
    const review = await Review.create({
      customer: req.user._id,
      product,
      rating,
      comment: trimmedComment,
      isApproved: false,
    });

    const populatedReview = await Review.findById(review._id)
      .populate('customer', 'name email')
      .populate('product');

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all reviews (admin only)
// @route   GET /api/reviews
// @access  Private/Admin/Super Admin
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const reviews = await Review.find({})
      .populate('customer', 'name email')
      .populate('product')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get approved reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const reviews = await Review.find({ product: productId, isApproved: true })
      .populate('customer', 'name')
      .populate('product')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user is admin or the review owner
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      const customerId = typeof review.customer === 'object' && '_id' in review.customer 
        ? (review.customer as any)._id.toString() 
        : review.customer.toString();
      if (customerId !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to modify this review' });
      }
    }

    // Validate rating if provided
    if (rating !== undefined) {
      if (typeof rating !== 'number' || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
        return res.status(400).json({ message: 'Rating must be an integer between 1 and 5' });
      }
      review.rating = rating;
    }

    // Trim and update comment if provided
    if (comment !== undefined) {
      review.comment = comment ? {
        en: comment.en ? comment.en.trim() : undefined,
        ar: comment.ar ? comment.ar.trim() : undefined,
      } : undefined;
    }

    const updatedReview = await review.save();

    const populatedReview = await Review.findById(updatedReview._id)
      .populate('customer', 'name email')
      .populate('product');

    res.json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Approve/reject review (admin only)
// @route   PATCH /api/reviews/:id/approve
// @access  Private/Admin/Super Admin
export const approveReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;
    const { isApproved } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    if (typeof isApproved !== 'boolean') {
      return res.status(400).json({ message: 'isApproved must be a boolean' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.isApproved = isApproved;
    const updatedReview = await review.save();

    const populatedReview = await Review.findById(updatedReview._id)
      .populate('customer', 'name email')
      .populate('product');

    res.json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user is admin or the review owner
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      const customerId = typeof review.customer === 'object' && '_id' in review.customer 
        ? (review.customer as any)._id.toString() 
        : review.customer.toString();
      if (customerId !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this review' });
      }
    }

    await Review.findByIdAndDelete(id);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
