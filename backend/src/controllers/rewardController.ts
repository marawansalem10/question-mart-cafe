
import { Request, Response } from 'express';
import Reward from '../models/Reward';
import Loyalty from '../models/Loyalty';
import PointsTransaction from '../models/PointsTransaction';
import mongoose from 'mongoose';
import { calculateMembershipLevel, isValidObjectId } from '../utils/helpers';

// @desc    Get all active rewards
// @route   GET /api/rewards
// @access  Public
export const getRewards = async (req: Request, res: Response) => {
  try {
    const rewards = await Reward.find({ isActive: true }).sort({ pointsRequired: 1 });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new reward
// @route   POST /api/rewards
// @access  Private/Admin/Super Admin
export const createReward = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { name, description, pointsRequired, image, isActive } = req.body;

    // Validate required fields
    if (!name?.en || !name?.ar) {
      return res.status(400).json({ message: 'Name in both English and Arabic is required' });
    }

    if (pointsRequired === undefined || typeof pointsRequired !== 'number' || pointsRequired < 0) {
      return res.status(400).json({ message: 'Points required must be a non-negative number' });
    }

    const reward = await Reward.create({
      name,
      description,
      pointsRequired,
      image,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(reward);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update reward
// @route   PUT /api/rewards/:id
// @access  Private/Admin/Super Admin
export const updateReward = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;
    const { name, description, pointsRequired, image, isActive } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid reward ID' });
    }

    const reward = await Reward.findById(id);
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    // Update fields
    if (name) reward.name = name;
    if (description !== undefined) reward.description = description;
    if (pointsRequired !== undefined) {
      if (typeof pointsRequired !== 'number' || pointsRequired < 0) {
        return res.status(400).json({ message: 'Points required must be a non-negative number' });
      }
      reward.pointsRequired = pointsRequired;
    }
    if (image !== undefined) reward.image = image;
    if (isActive !== undefined) reward.isActive = isActive;

    const updatedReward = await reward.save();

    res.json(updatedReward);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete reward
// @route   DELETE /api/rewards/:id
// @access  Private/Admin/Super Admin
export const deleteReward = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid reward ID' });
    }

    const reward = await Reward.findById(id);
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    await Reward.findByIdAndDelete(id);

    res.json({ message: 'Reward deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Redeem reward
// @route   POST /api/rewards/:id/redeem
// @access  Private/Customer
export const redeemReward = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid reward ID' });
    }

    // Check if reward exists and is active
    const reward = await Reward.findById(id);
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    if (!reward.isActive) {
      return res.status(400).json({ message: 'Reward is not active' });
    }

    // Get or create loyalty account
    let loyalty = await Loyalty.findOne({ customer: req.user._id });
    if (!loyalty) {
      loyalty = await Loyalty.create({
        customer: req.user._id,
        membershipLevel: 'bronze',
        qrCode: `QMC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        points: 0,
      });
    }

    // Check if customer has enough points
    if (loyalty.points < reward.pointsRequired) {
      return res.status(400).json({ 
        message: 'Insufficient points',
        required: reward.pointsRequired,
        available: loyalty.points,
      });
    }

    // Deduct points
    loyalty.points -= reward.pointsRequired;

    // Update membership level based on new points
    loyalty.membershipLevel = calculateMembershipLevel(loyalty.points);

    await loyalty.save();

    // Create points transaction
    await PointsTransaction.create({
      loyalty: loyalty._id,
      type: 'redeem',
      amount: reward.pointsRequired,
      description: `Redeemed reward: ${reward.name.en}`,
    });

    const updatedLoyalty = await Loyalty.findById(loyalty._id).populate('customer', 'name email');

    res.json(updatedLoyalty);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get redemption history for current user
// @route   GET /api/rewards/history/me
// @access  Private/Customer
export const getRedemptionHistory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Get loyalty account
    const loyalty = await Loyalty.findOne({ customer: req.user._id });
    if (!loyalty) {
      return res.json([]);
    }

    // Get all redemption transactions
    const transactions = await PointsTransaction.find({ 
      loyalty: loyalty._id,
      type: 'redeem',
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
