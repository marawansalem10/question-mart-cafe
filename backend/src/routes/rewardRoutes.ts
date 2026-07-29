
import express from 'express';
import {
  getRewards,
  createReward,
  updateReward,
  deleteReward,
  redeemReward,
  getRedemptionHistory,
} from '../controllers/rewardController';
import protect from '../middleware/auth';
import authorize from '../middleware/authorize';

const router = express.Router();

router.get('/', getRewards);
router.post('/', protect, authorize('admin', 'super_admin'), createReward);
router.put('/:id', protect, authorize('admin', 'super_admin'), updateReward);
router.delete('/:id', protect, authorize('admin', 'super_admin'), deleteReward);
router.post('/:id/redeem', protect, redeemReward);
router.get('/history/me', protect, getRedemptionHistory);

export default router;
