
import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import protect from '../middleware/auth';
import authorize from '../middleware/authorize';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorize('admin', 'super_admin'), createProduct);
router.put('/:id', protect, authorize('admin', 'super_admin'), updateProduct);
router.delete('/:id', protect, authorize('admin', 'super_admin'), deleteProduct);

export default router;
