
import { Request, Response } from 'express';
import Category from '../models/Category';
import mongoose from 'mongoose';

// @desc    Get all active categories, sorted by displayOrder
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, slug, type, image, displayOrder } = req.body;

    // Validate required fields
    if (!name?.en || !name?.ar || !slug || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate type
    if (!['drink', 'bakery', 'food'].includes(type)) {
      return res.status(400).json({ message: 'Invalid category type' });
    }

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({ message: 'Slug already exists' });
    }

    const category = await Category.create({
      name,
      description,
      slug,
      type,
      image,
      displayOrder,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, slug, type, image, displayOrder, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    // Validate type if provided
    if (type && !['drink', 'bakery', 'food'].includes(type)) {
      return res.status(400).json({ message: 'Invalid category type' });
    }

    // Check if slug is being changed and already exists
    if (slug) {
      const existingCategory = await Category.findOne({ slug, _id: { $ne: id } });
      if (existingCategory) {
        return res.status(400).json({ message: 'Slug already exists' });
      }
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update fields
    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    if (slug) category.slug = slug;
    if (type) category.type = type;
    if (image !== undefined) category.image = image;
    if (displayOrder !== undefined) category.displayOrder = displayOrder;
    if (isActive !== undefined) category.isActive = isActive;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Soft delete category (set isActive to false)
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.isActive = false;
    await category.save();

    res.json({ message: 'Category deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
