
import express from 'express';
import {
  createReservation,
  getMyReservations,
  getAllReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation,
} from '../controllers/reservationController';
import protect from '../middleware/auth';
import authorize from '../middleware/authorize';

const router = express.Router();

router.post('/', protect, createReservation);
router.get('/my-reservations', protect, getMyReservations);
router.get('/', protect, authorize('admin', 'super_admin'), getAllReservations);
router.get('/:id', protect, getReservationById);
router.patch('/:id/status', protect, authorize('admin', 'super_admin'), updateReservationStatus);
router.delete('/:id', protect, deleteReservation);

export default router;
