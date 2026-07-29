
import { Request, Response } from 'express';
import Reservation from '../models/Reservation';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: (any & { _id: mongoose.Types.ObjectId }) | null;
}

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Private/Customer
export const createReservation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { date, time, guests, seatingType, notes } = req.body;

    // Validate required fields
    if (!date || !time || !guests || !seatingType) {
      return res.status(400).json({ message: 'Please provide date, time, guests, and seating type' });
    }

    // Validate seating type
    if (!['indoor', 'outdoor'].includes(seatingType)) {
      return res.status(400).json({ message: 'Invalid seating type. Must be indoor or outdoor' });
    }

    // Validate guests
    if (typeof guests !== 'number' || guests < 1) {
      return res.status(400).json({ message: 'Number of guests must be greater than 0' });
    }

    // Validate date - cannot be in the past
    const reservationDate = new Date(date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    reservationDate.setHours(0, 0, 0, 0);

    if (reservationDate < now) {
      return res.status(400).json({ message: 'Reservation date cannot be in the past' });
    }

    // Create reservation
    const reservation = await Reservation.create({
      customer: req.user._id,
      date,
      time,
      guests,
      seatingType,
      notes,
      status: 'pending',
    });

    const populatedReservation = await Reservation.findById(reservation._id).populate('customer', 'name email phone');

    res.status(201).json(populatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user's reservations
// @route   GET /api/reservations/my-reservations
// @access  Private/Customer
export const getMyReservations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const reservations = await Reservation.find({ customer: req.user._id })
      .populate('customer', 'name email phone')
      .sort({ date: 1, time: 1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all reservations (admin only)
// @route   GET /api/reservations
// @access  Private/Admin/Super Admin
export const getAllReservations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const reservations = await Reservation.find({})
      .populate('customer', 'name email phone')
      .sort({ date: 1, time: 1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single reservation by ID
// @route   GET /api/reservations/:id
// @access  Private
export const getReservationById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid reservation ID' });
    }

    const reservation = await Reservation.findById(id).populate('customer', 'name email phone');

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check if user is admin or the reservation owner
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      const customerId = typeof reservation.customer === 'object' && '_id' in reservation.customer 
        ? (reservation.customer as any)._id.toString() 
        : reservation.customer.toString();
      if (customerId !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to access this reservation' });
      }
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update reservation status (admin only)
// @route   PATCH /api/reservations/:id/status
// @access  Private/Admin/Super Admin
export const updateReservationStatus = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid reservation ID' });
    }

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.status = status;
    const updatedReservation = await reservation.save();

    const populatedReservation = await Reservation.findById(updatedReservation._id).populate('customer', 'name email phone');

    res.json(populatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete/cancel reservation
// @route   DELETE /api/reservations/:id
// @access  Private
export const deleteReservation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid reservation ID' });
    }

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check if user is admin or the reservation owner
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      const customerId = typeof reservation.customer === 'object' && '_id' in reservation.customer 
        ? (reservation.customer as any)._id.toString() 
        : reservation.customer.toString();
      if (customerId !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to access this reservation' });
      }

      // Customers can only cancel pending reservations
      if (reservation.status !== 'pending') {
        return res.status(400).json({ message: 'Can only cancel reservations with pending status' });
      }
    }

    // Admin can delete any reservation, customer can cancel (soft delete by setting status to cancelled)
    if (req.user.role === 'admin' || req.user.role === 'super_admin') {
      await Reservation.findByIdAndDelete(id);
      return res.json({ message: 'Reservation deleted successfully' });
    } else {
      reservation.status = 'cancelled';
      await reservation.save();
      const populatedReservation = await Reservation.findById(reservation._id).populate('customer', 'name email phone');
      return res.json(populatedReservation);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
