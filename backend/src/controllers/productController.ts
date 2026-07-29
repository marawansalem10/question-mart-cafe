
import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import { isValidObjectId } from '../utils/helpers';

// @desc    Get all available products, sorted by displayOrder, populate category
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isAvailable: true })
      .populate('category')
      .sort({ displayOrder: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single product by ID, populate category
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin/Super Admin
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, sizes, image, isAvailable, isFeatured, displayOrder, tags } = req.body;

    // Validate required fields
    if (!name?.en || !name?.ar || !category || !sizes || !Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate category exists
    if (!isValidObjectId(category)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Validate each size
    for (const size of sizes) {
      if (!size.name || typeof size.price !== 'number' || size.price < 0) {
        return res.status(400).json({ message: 'Invalid size data' });
      }
    }

    const product = await Product.create({
      name,
      description,
      category,
      sizes,
      image,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      displayOrder: displayOrder !== undefined ? displayOrder : 0,
      tags,
    });

    const newProduct = await Product.findById(product._id).populate('category');
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin/Super Admin
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, category, sizes, image, isAvailable, isFeatured, displayOrder, tags } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Validate category if provided
    if (category) {
      if (!isValidObjectId(category)) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    // Validate sizes if provided
    if (sizes) {
      if (!Array.isArray(sizes) || sizes.length === 0) {
        return res.status(400).json({ message: 'Invalid sizes data' });
      }
      for (const size of sizes) {
        if (!size.name || typeof size.price !== 'number' || size.price < 0) {
          return res.status(400).json({ message: 'Invalid size data' });
        }
      }
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    if (name) product.name = name;
    if (description !== undefined) product.description = description;
    if (category) product.category = category;
    if (sizes) product.sizes = sizes;
    if (image !== undefined) product.image = image;
    if (isAvailable !== undefined) product.isAvailable = isAvailable;
    if (isFeatured !== undefined) product.isFeatured = isFeatured;
    if (displayOrder !== undefined) product.displayOrder = displayOrder;
    if (tags) product.tags = tags;

    const updatedProduct = await product.save();
    const populatedProduct = await Product.findById(updatedProduct._id).populate('category');

    res.json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Soft delete product (set isAvailable to false)
// @route   DELETE /api/products/:id
// @access  Private/Admin/Super Admin
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isAvailable = false;
    await product.save();

    res.json({ message: 'Product deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
