
import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController';
import protect from '../middleware/auth';
import authorize from '../middleware/authorize';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.get('/', protect, authorize('admin', 'super_admin'), getAllOrders);
router.patch('/:id/status', protect, authorize('admin', 'super_admin'), updateOrderStatus);

export default router;
