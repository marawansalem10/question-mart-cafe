
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedCategories } from './categories.seed';
import { seedProducts } from './products.seed';

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  const startTime = Date.now();
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/questionmartcafe';

  try {
    // Connect to database
    console.log('Connecting to database...');
    await mongoose.connect(mongoURI);
    console.log('Connected.\n');

    // Seed categories
    const categoriesCount = await seedCategories();
    console.log('');

    // Seed products
    const productsCount = await seedProducts();
    console.log('');

    // Calculate execution time
    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;

    // Print final summary
    console.log('Database Seed Completed');
    console.log('-------------------------');
    console.log(`Categories processed: ${categoriesCount}`);
    console.log(`Products processed: ${productsCount}`);
    console.log(`Execution time: ${executionTime.toFixed(2)}s`);

    // Exit process
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:');
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
