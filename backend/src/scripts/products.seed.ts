
import Product from '../models/Product';
import Category from '../models/Category';
import { productsData } from '../data/products';
import mongoose from 'mongoose';

export const seedProducts = async (): Promise<number> => {
  console.log('Seeding Products...');

  // 1. Get all existing categories to resolve categoryName to category ID
  const categories = await Category.find({});
  const categoryMap = new Map<string, mongoose.Types.ObjectId>();

  for (const cat of categories) {
    // Key by both en and ar names for lookups
    const keyEn = cat.name.en.toLowerCase();
    const keyAr = cat.name.ar.toLowerCase();
    categoryMap.set(keyEn, cat._id);
    categoryMap.set(keyAr, cat._id);
  }

  // 2. Validate product data
  const productNamesEn = new Set<string>();
  const productNamesAr = new Set<string>();

  for (const product of productsData) {
    // Validate category exists
    const catKeyEn = product.categoryName.en.toLowerCase();
    const catKeyAr = product.categoryName.ar.toLowerCase();
    const categoryId = categoryMap.get(catKeyEn) || categoryMap.get(catKeyAr);
    if (!categoryId) {
      throw new Error(
        `Category not found for product "${product.name.en}" (category: "${product.categoryName.en}")`
      );
    }

    // Check for duplicate product names
    if (productNamesEn.has(product.name.en)) {
      throw new Error(`Duplicate product English name: "${product.name.en}"`);
    }
    productNamesEn.add(product.name.en);

    if (productNamesAr.has(product.name.ar)) {
      throw new Error(`Duplicate product Arabic name: "${product.name.ar}"`);
    }
    productNamesAr.add(product.name.ar);

    // Validate sizes
    if (!product.sizes || !Array.isArray(product.sizes) || product.sizes.length === 0) {
      throw new Error(`Product "${product.name.en}" has invalid sizes`);
    }
    for (const size of product.sizes) {
      if (!size.name || typeof size.price !== 'number' || size.price < 0) {
        throw new Error(
          `Product "${product.name.en}" has invalid size: ${JSON.stringify(size)}`
        );
      }
    }
  }

  // 3. Prepare bulk upsert operations (upsert by product.en name for idempotency)
  const operations = productsData.map((product) => {
    const catKeyEn = product.categoryName.en.toLowerCase();
    const catKeyAr = product.categoryName.ar.toLowerCase();
    const categoryId = categoryMap.get(catKeyEn) || categoryMap.get(catKeyAr)!;

    // Build product document
    const productDoc = {
      name: product.name,
      description: product.description,
      category: categoryId,
      sizes: product.sizes,
      image: product.image,
      isAvailable: product.isAvailable !== undefined ? product.isAvailable : true,
      isFeatured: product.isFeatured !== undefined ? product.isFeatured : false,
      displayOrder: product.displayOrder !== undefined ? product.displayOrder : 0,
      tags: product.tags || [],
    };

    return {
      updateOne: {
        filter: { 'name.en': product.name.en }, // Upsert by English name as unique identifier
        update: { $set: productDoc },
        upsert: true,
      },
    };
  });

  if (operations.length > 0) {
    await Product.bulkWrite(operations);
  }

  console.log('✓ Products completed');
  return productsData.length;
};
