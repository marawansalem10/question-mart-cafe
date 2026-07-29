
import { Request, Response } from 'express';
import Branch from '../models/Branch';
import { isValidObjectId } from '../utils/helpers';

// @desc    Get all active branches
// @route   GET /api/branches
// @access  Public
export const getBranches = async (req: Request, res: Response) => {
  try {
    const branches = await Branch.find({ isActive: true }).sort({ name: 1 });
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single branch by ID
// @route   GET /api/branches/:id
// @access  Public
export const getBranchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid branch ID' });
    }

    const branch = await Branch.findById(id);

    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new branch
// @route   POST /api/branches
// @access  Private/Admin/Super Admin
export const createBranch = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { name, address, phone, email, location, isActive } = req.body;

    // Validate required fields
    if (!name?.en || !name?.ar) {
      return res.status(400).json({ message: 'Name in both English and Arabic is required' });
    }

    if (!address?.en || !address?.ar) {
      return res.status(400).json({ message: 'Address in both English and Arabic is required' });
    }

    if (!phone) {
      return res.status(400).json({ message: 'Phone is required' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check for duplicate branch names
    const existingBranch = await Branch.findOne({
      $or: [
        { 'name.en': name.en },
        { 'name.ar': name.ar },
      ],
    });

    if (existingBranch) {
      return res.status(400).json({ message: 'Branch name already exists' });
    }

    // Validate location coordinates if provided
    if (location && location.coordinates) {
      if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        return res.status(400).json({ message: 'Location coordinates must be an array of 2 numbers [longitude, latitude]' });
      }
      if (typeof location.coordinates[0] !== 'number' || typeof location.coordinates[1] !== 'number') {
        return res.status(400).json({ message: 'Location coordinates must be numbers' });
      }
    }

    const branch = await Branch.create({
      name,
      address,
      phone,
      email,
      location,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update branch
// @route   PUT /api/branches/:id
// @access  Private/Admin/Super Admin
export const updateBranch = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;
    const { name, address, phone, email, location, isActive } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid branch ID' });
    }

    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Check for duplicate branch names if name is being updated
    if (name) {
      const existingBranch = await Branch.findOne({
        _id: { $ne: id },
        $or: [
          { 'name.en': name.en },
          { 'name.ar': name.ar },
        ],
      });

      if (existingBranch) {
        return res.status(400).json({ message: 'Branch name already exists' });
      }
      branch.name = name;
    }

    // Update other fields
    if (address) branch.address = address;
    if (phone) branch.phone = phone;
    if (email) branch.email = email;
    if (location) {
      // Validate location coordinates if provided
      if (location.coordinates) {
        if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
          return res.status(400).json({ message: 'Location coordinates must be an array of 2 numbers [longitude, latitude]' });
        }
        if (typeof location.coordinates[0] !== 'number' || typeof location.coordinates[1] !== 'number') {
          return res.status(400).json({ message: 'Location coordinates must be numbers' });
        }
      }
      branch.location = location;
    }
    if (isActive !== undefined) branch.isActive = isActive;

    const updatedBranch = await branch.save();

    res.json(updatedBranch);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete branch
// @route   DELETE /api/branches/:id
// @access  Private/Admin/Super Admin
export const deleteBranch = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid branch ID' });
    }

    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    await Branch.findByIdAndDelete(id);

    res.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update branch status (activate/deactivate)
// @route   PATCH /api/branches/:id/status
// @access  Private/Admin/Super Admin
export const updateBranchStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;
    const { isActive } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid branch ID' });
    }

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'isActive must be a boolean' });
    }

    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    branch.isActive = isActive;
    const updatedBranch = await branch.save();

    res.json(updatedBranch);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
