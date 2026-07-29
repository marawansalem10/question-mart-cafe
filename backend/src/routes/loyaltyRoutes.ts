
import express from 'express';
import {
  getMyLoyalty,
  getUserLoyalty,
  addPoints,
  removePoints,
  updateMembership,
  regenerateQR,
} from '../controllers/loyaltyController';
import protect from '../middleware/auth';
import authorize from '../middleware/authorize';

const router = express.Router();

router.get('/me', protect, getMyLoyalty);
router.get('/:userId', protect, authorize('admin', 'super_admin'), getUserLoyalty);
router.patch('/:userId/add-points', protect, authorize('admin', 'super_admin'), addPoints);
router.patch('/:userId/remove-points', protect, authorize('admin', 'super_admin'), removePoints);
router.patch('/:userId/membership', protect, authorize('admin', 'super_admin'), updateMembership);
router.patch('/:userId/regenerate-qr', protect, authorize('admin', 'super_admin'), regenerateQR);

export default router;
