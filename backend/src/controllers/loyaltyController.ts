
import { Request, Response } from 'express';
import Loyalty from '../models/Loyalty';
import PointsTransaction from '../models/PointsTransaction';
import mongoose from 'mongoose';
import { calculateMembershipLevel, generateQRCode, isValidObjectId } from '../utils/helpers';

// Helper function to create points transaction
const createPointsTransaction = async (
  loyaltyId: mongoose.Types.ObjectId,
  type: 'earn' | 'redeem' | 'admin_add' | 'admin_remove',
  amount: number,
  description: string
): Promise<void> => {
  await PointsTransaction.create({
    loyalty: loyaltyId,
    type,
    amount,
    description,
  });
};

// @desc    Get current user's loyalty account
// @route   GET /api/loyalty/me
// @access  Private/Customer
export const getMyLoyalty = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    let loyalty = await Loyalty.findOne({ customer: req.user._id }).populate('customer', 'name email');

    // Create loyalty account if it doesn't exist
    if (!loyalty) {
      loyalty = await Loyalty.create({
        customer: req.user._id,
        membershipLevel: 'bronze',
        qrCode: generateQRCode(),
        points: 0,
      });
      loyalty = await Loyalty.findById(loyalty._id).populate('customer', 'name email');
    }

    res.json(loyalty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's loyalty account by ID (admin only)
// @route   GET /api/loyalty/:userId
// @access  Private/Admin/Super Admin
export const getUserLoyalty = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    let loyalty = await Loyalty.findOne({ customer: userId }).populate('customer', 'name email');

    // Create loyalty account if it doesn't exist
    if (!loyalty) {
      loyalty = await Loyalty.create({
        customer: userId,
        membershipLevel: 'bronze',
        qrCode: generateQRCode(),
        points: 0,
      });
      loyalty = await Loyalty.findById(loyalty._id).populate('customer', 'name email');
    }

    res.json(loyalty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add points to loyalty account (admin only)
// @route   PATCH /api/loyalty/:userId/add-points
// @access  Private/Admin/Super Admin
export const addPoints = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { userId } = req.params;
    const { amount, description } = req.body;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ message: 'Description is required' });
    }

    let loyalty = await Loyalty.findOne({ customer: userId });

    // Create loyalty account if it doesn't exist
    if (!loyalty) {
      loyalty = await Loyalty.create({
        customer: userId,
        membershipLevel: 'bronze',
        qrCode: generateQRCode(),
        points: 0,
      });
    }

    // Add points
    loyalty.points += amount;

    // Update membership level based on new points
    loyalty.membershipLevel = calculateMembershipLevel(loyalty.points);

    await loyalty.save();

    // Create points transaction
    await createPointsTransaction(loyalty._id, 'admin_add', amount, description);

    const updatedLoyalty = await Loyalty.findById(loyalty._id).populate('customer', 'name email');

    res.json(updatedLoyalty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove points from loyalty account (admin only)
// @route   PATCH /api/loyalty/:userId/remove-points
// @access  Private/Admin/Super Admin
export const removePoints = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { userId } = req.params;
    const { amount, description } = req.body;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    if (!description || typeof description !== 'string') {
      return res.status(400).json({ message: 'Description is required' });
    }

    const loyalty = await Loyalty.findOne({ customer: userId });

    if (!loyalty) {
      return res.status(404).json({ message: 'Loyalty account not found' });
    }

    // Check if points would go negative
    if (loyalty.points - amount < 0) {
      return res.status(400).json({ message: 'Insufficient points. Points cannot become negative' });
    }

    // Remove points
    loyalty.points -= amount;

    // Update membership level based on new points
    loyalty.membershipLevel = calculateMembershipLevel(loyalty.points);

    await loyalty.save();

    // Create points transaction
    await createPointsTransaction(loyalty._id, 'admin_remove', amount, description);

    const updatedLoyalty = await Loyalty.findById(loyalty._id).populate('customer', 'name email');

    res.json(updatedLoyalty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update membership level (admin only)
// @route   PATCH /api/loyalty/:userId/membership
// @access  Private/Admin/Super Admin
export const updateMembership = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { userId } = req.params;
    const { membershipLevel } = req.body;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!membershipLevel || !['bronze', 'silver', 'gold', 'platinum'].includes(membershipLevel)) {
      return res.status(400).json({ message: 'Invalid membership level' });
    }

    let loyalty = await Loyalty.findOne({ customer: userId });

    // Create loyalty account if it doesn't exist
    if (!loyalty) {
      loyalty = await Loyalty.create({
        customer: userId,
        membershipLevel: 'bronze',
        qrCode: generateQRCode(),
        points: 0,
      });
    }

    loyalty.membershipLevel = membershipLevel;
    await loyalty.save();

    const updatedLoyalty = await Loyalty.findById(loyalty._id).populate('customer', 'name email');

    res.json(updatedLoyalty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Regenerate QR code (admin only)
// @route   PATCH /api/loyalty/:userId/regenerate-qr
// @access  Private/Admin/Super Admin
export const regenerateQR = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    let loyalty = await Loyalty.findOne({ customer: userId });

    // Create loyalty account if it doesn't exist
    if (!loyalty) {
      loyalty = await Loyalty.create({
        customer: userId,
        membershipLevel: 'bronze',
        qrCode: generateQRCode(),
        points: 0,
      });
    }

    loyalty.qrCode = generateQRCode();
    await loyalty.save();

    const updatedLoyalty = await Loyalty.findById(loyalty._id).populate('customer', 'name email');

    res.json(updatedLoyalty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
