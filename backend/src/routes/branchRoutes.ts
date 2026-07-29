
import express from 'express';
import {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
  updateBranchStatus,
} from '../controllers/branchController';
import protect from '../middleware/auth';
import authorize from '../middleware/authorize';

const router = express.Router();

router.get('/', getBranches);
router.get('/:id', getBranchById);
router.post('/', protect, authorize('admin', 'super_admin'), createBranch);
router.put('/:id', protect, authorize('admin', 'super_admin'), updateBranch);
router.delete('/:id', protect, authorize('admin', 'super_admin'), deleteBranch);
router.patch('/:id/status', protect, authorize('admin', 'super_admin'), updateBranchStatus);

export default router;
