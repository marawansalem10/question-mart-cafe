
import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import mongoose from 'mongoose';
import { isValidObjectId } from '../utils/helpers';

interface OrderItemInput {
  product: string;
  productName: string;
  selectedSize: string;
  unitPrice: number;
  quantity: number;
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/Customer
export const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { items, paymentMethod, orderType, notes, discount, serviceFee } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    if (!paymentMethod || !['cash', 'card', 'wallet'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    if (!orderType || !['dine_in', 'takeaway', 'delivery'].includes(orderType)) {
      return res.status(400).json({ message: 'Invalid order type' });
    }

    // Fetch all products and validate
    const validatedItems = [];
    let subtotal = 0;

    for (const item of items) {
      if (!isValidObjectId(item.product)) {
        return res.status(400).json({ message: `Invalid product ID: ${item.product}` });
      }

      if (!item.selectedSize || typeof item.selectedSize !== 'string') {
        return res.status(400).json({ message: 'Selected size is required for each item' });
      }

      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1) {
        return res.status(400).json({ message: 'Invalid quantity for item' });
      }

      // Fetch product from database
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      if (!product.isAvailable) {
        return res.status(400).json({ message: `Product is not available: ${product.name.en}` });
      }

      // Find the selected size
      const size = product.sizes.find((s: any) => s.name === item.selectedSize);
      if (!size) {
        return res.status(400).json({ 
          message: `Size "${item.selectedSize}" not found for product: ${product.name.en}` 
        });
      }

      // Use the real price from database
      const unitPrice = size.price;
      const quantity = item.quantity;
      const totalPrice = unitPrice * quantity;

      validatedItems.push({
        product: product._id,
        productName: product.name.en,
        selectedSize: item.selectedSize,
        unitPrice,
        quantity,
        totalPrice,
      });

      subtotal += totalPrice;
    }

    // Calculate totals
    const discountValue = discount && typeof discount === 'number' && discount >= 0 ? discount : 0;
    const serviceFeeValue = serviceFee && typeof serviceFee === 'number' && serviceFee >= 0 ? serviceFee : 0;
    const total = subtotal - discountValue + serviceFeeValue;

    if (total < 0) {
      return res.status(400).json({ message: 'Total cannot be negative' });
    }

    // Create order
    const order = await Order.create({
      customer: req.user._id,
      items: validatedItems,
      subtotal,
      discount: discountValue,
      serviceFee: serviceFeeValue,
      total,
      paymentMethod,
      paymentStatus: 'pending',
      orderType,
      orderStatus: 'pending',
      notes,
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('customer', 'name email phone')
      .populate('items.product');

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user's orders
// @route   GET /api/orders/my-orders
// @access  Private/Customer
export const getMyOrders = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const orders = await Order.find({ customer: req.user._id })
      .populate('customer', 'name email phone')
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(id)
      .populate('customer', 'name email phone')
      .populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is admin or the order owner
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      const customerId = typeof order.customer === 'object' && '_id' in order.customer 
        ? (order.customer as any)._id.toString() 
        : order.customer.toString();
      if (customerId !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to access this order' });
      }
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin/Super Admin
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const orders = await Order.find({})
      .populate('customer', 'name email phone')
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update order status (admin only)
// @route   PATCH /api/orders/:id/status
// @access  Private/Admin/Super Admin
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate orderStatus if provided
    if (orderStatus) {
      const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
      if (!validStatuses.includes(orderStatus)) {
        return res.status(400).json({ message: 'Invalid order status' });
      }
      order.orderStatus = orderStatus;
    }

    // Validate paymentStatus if provided
    if (paymentStatus) {
      const validPaymentStatuses = ['pending', 'paid', 'failed'];
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({ message: 'Invalid payment status' });
      }
      order.paymentStatus = paymentStatus;
    }

    const updatedOrder = await order.save();

    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('customer', 'name email phone')
      .populate('items.product');

    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
