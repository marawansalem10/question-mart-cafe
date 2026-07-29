
import express from 'express';
import {
  createReview,
  getAllReviews,
  getProductReviews,
  updateReview,
  approveReview,
  deleteReview,
} from '../controllers/reviewController';
import protect from '../middleware/auth';
import authorize from '../middleware/authorize';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/', protect, authorize('admin', 'super_admin'), getAllReviews);
router.get('/product/:productId', getProductReviews);
router.put('/:id', protect, updateReview);
router.patch('/:id/approve', protect, authorize('admin', 'super_admin'), approveReview);
router.delete('/:id', protect, deleteReview);

export default router;
