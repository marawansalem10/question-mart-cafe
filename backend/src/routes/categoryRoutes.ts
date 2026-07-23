
import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import protect from '../middleware/auth';
import authorize from '../middleware/authorize';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', protect, authorize('admin', 'super_admin'), createCategory);
router.put('/:id', protect, authorize('admin', 'super_admin'), updateCategory);
router.delete('/:id', protect, authorize('admin', 'super_admin'), deleteCategory);

export default router;
